/**
 * Base URL for the Hono API (Cloudflare Worker), NOT the Next.js site URL.
 * Set NEXT_PUBLIC_API_URL in Vercel to your *.workers.dev (or custom API domain).
 */
const DEFAULT_PRODUCTION_API_URL =
  "https://oyun-uhaanii-api.osohoo691016.workers.dev";

/** If NEXT_PUBLIC_API_URL is mistakenly set to the marketing site, BFF routes self-fetch and return no data. */
function isWrongApiUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    const h = hostname.toLowerCase();
    return h === "www.academyofficer.mn" || h === "academyofficer.mn";
  } catch {
    return false;
  }
}

export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) {
    if (isWrongApiUrl(raw)) {
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "[env] NEXT_PUBLIC_API_URL must be your Worker URL, not the website. Using default API URL."
        );
      }
      return DEFAULT_PRODUCTION_API_URL;
    }
    return raw;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5001";
  }

  return DEFAULT_PRODUCTION_API_URL;
}
