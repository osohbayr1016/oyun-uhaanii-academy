export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl.trim();

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:5001";
  }

  throw new Error(
    "NEXT_PUBLIC_API_URL is not set in production. Configure it in Vercel env."
  );
}

