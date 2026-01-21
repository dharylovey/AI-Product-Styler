import type { VercelRequest, VercelResponse } from "@vercel/node";

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

  const { targetUrl, body } = req.body;

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
  } catch (error: any) {
    console.error("Proxy Error:", error);
    res
      .status(500)
      .json({ error: "Proxy Request Failed", message: error.message });
  }
}
