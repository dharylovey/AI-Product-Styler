// This service now connects to your n8n workflow instead of calling Gemini directly.

const WEBHOOK_STORAGE_KEY = "n8n_webhook_url";

export const getWebhookUrl = (): string =>
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  localStorage.getItem(WEBHOOK_STORAGE_KEY) ||
  "";

export const setWebhookUrl = (url: string): void =>
  localStorage.setItem(WEBHOOK_STORAGE_KEY, url);

interface N8nRequestBody {
  image: string;
  color: string;
  productName: string;
  model: string;
}

interface N8nProxyRequest {
  targetUrl: string;
  body: N8nRequestBody;
}

interface N8nResponse {
  image?: string;
  output?: string;
  data?: string;
}

/**
 * Sends the product image and selection to an n8n webhook for processing.
 * @param imageBase64 The base64 string of the original image.
 * @param targetColor The selected color name.
 * @param productName Context about the product.
 * @param model The selected AI model ID.
 * @returns Promise resolving to the base64 data URI of the generated image.
 */
export const generateStyledProductImage = async (
  imageBase64: string,
  targetColor: string,
  productName: string,
  model: string,
): Promise<string> => {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    throw new Error(
      "n8n Webhook URL is not configured. Click the Settings icon to add it.",
    );
  }

  try {
    const isHttps = window.location.protocol === "https:";
    const isTargetHttp = webhookUrl.startsWith("http://");

    let fetchUrl = webhookUrl;
    let fetchBody: N8nRequestBody | N8nProxyRequest = {
      image: imageBase64,
      color: targetColor,
      productName: productName,
      model: model,
    };

    // If we are on HTTPS and trying to hit HTTP, we MUST use the proxy
    if (isHttps && isTargetHttp) {
      fetchUrl = "/api/n8n-proxy";
      fetchBody = {
        targetUrl: webhookUrl,
        body: fetchBody as N8nRequestBody,
      };
    }

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchBody),
    });

    if (!response.ok) {
      throw new Error(`n8n Error: ${response.statusText} (${response.status})`);
    }

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = (await response.json()) as N8nResponse | string;

      // Handle various JSON response formats from n8n
      // Expectation: { "image": "data:image/png;base64,..." }
      if (typeof data === "object") {
        if (data.image) return data.image;
        if (data.output) return data.output;
        if (data.data) return data.data;
      }

      // If n8n returns just the base64 string in the body
      if (typeof data === "string" && data.startsWith("data:image")) {
        return data;
      }

      console.error("Unexpected n8n response:", data);
      throw new Error(
        "Invalid response from n8n. Expected JSON with an 'image' property.",
      );
    } else {
      // Assume it's a raw image (Binary response)
      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to read blob as string"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  } catch (error: unknown) {
    console.error("n8n Connection Error:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to connect to n8n webhook.");
    }
    throw new Error(
      "Failed to connect to n8n webhook due to an unknown error.",
    );
  }
};
