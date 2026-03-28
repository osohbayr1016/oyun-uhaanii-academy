/**
 * Client-only: attach JWT from localStorage for admin fetches to the Next BFF.
 */
export function bearerHeaders(
  extra?: Record<string, string>
): Record<string, string> {
  const h: Record<string, string> = { ...extra };
  if (typeof window === "undefined") return h;
  const token = localStorage.getItem("token");
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}
