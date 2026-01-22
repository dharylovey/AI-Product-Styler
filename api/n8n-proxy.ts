import type { VercelRequest, VercelResponse } from "@vercel/node";

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "5", 10);
const RATE_LIMIT_WINDOW_MS =
  parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || "5", 10) * 60 * 1000;

// In-memory store for rate limiting (resets on cold start, but still effective)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000); // Clean every minute

function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingMs?: number;
} {
  const now = Date.now();
  let entry = rateLimitStore.get(ip);

  // Reset if window has passed
  if (!entry || now > entry.resetTime) {
    entry = { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    rateLimitStore.set(ip, entry);
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remainingMs: entry.resetTime - now };
  }

  entry.count++;
  rateLimitStore.set(ip, entry);
  return { allowed: true };
}

// This function acts as a proxy to bypass Mixed Content errors (HTTPS -> HTTP)
// It runs on Vercel's backend network.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Rate limiting check
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    (req.headers["x-real-ip"] as string) ||
    "unknown";

  const rateLimitResult = checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    const remainingMins = Math.ceil((rateLimitResult.remainingMs || 0) / 60000);
    res.status(429).json({
      error: `Rate limit exceeded. Please try again in ${remainingMins} minute(s).`,
    });
    return;
  }

  const { targetUrl, body } = req.body as { targetUrl: string; body: unknown };

  if (!targetUrl) {
    res.status(400).json({ error: "Missing targetUrl in request body" });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      res
        .status(response.status)
        .json({ error: `n8n Error: ${response.statusText}`, details: text });
      return;
    }

    // Pass through the response
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      // Handle binary/blobs by converting to arrayBuffer -> base64 or sending directly?
      // Vercel serverless functions have size limits (less than 4.5MB usually for body).
      // n8n returning an image usually returns a large JSON or raw binary.
      // If raw binary, we might need to buffer it.

      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader("Content-Type", contentType || "application/octet-stream");
      res.send(buffer);
    }
  } catch (error: unknown) {
    console.error("Proxy Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ error: "Proxy Request Failed", message });
  }
}
