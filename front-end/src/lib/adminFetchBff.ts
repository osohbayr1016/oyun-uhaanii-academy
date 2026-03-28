import { fetchBffJson } from "./fetchBffWithRetry";

/** BFF GET with optional Bearer token (e.g. /api/admin/*). */
export async function fetchBffJsonAdmin<T>(
  path: string,
  init?: RequestInit,
  opts?: { maxAttempts?: number }
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers(init?.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetchBffJson<T>(path, { ...init, headers }, opts);
}
