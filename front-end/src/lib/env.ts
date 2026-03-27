/**
 * Default public API (Cloudflare Worker). Override with NEXT_PUBLIC_API_URL in Vercel/hosting.
 */
const DEFAULT_PRODUCTION_API_URL =
  "https://oyun-uhaanii-api.osohoo691016.workers.dev";

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl.trim();

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5001";
  }

  return DEFAULT_PRODUCTION_API_URL;
}
