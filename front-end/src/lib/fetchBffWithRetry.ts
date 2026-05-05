function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status === 503 || status >= 500;
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

/** Headers that should not be auto-overridden if the caller set them already. */
function hasHeader(init: RequestInit | undefined, name: string): boolean {
  const h = init?.headers;
  if (!h) return false;
  const lc = name.toLowerCase();
  if (h instanceof Headers) return h.has(name);
  if (Array.isArray(h)) return h.some(([k]) => k.toLowerCase() === lc);
  if (typeof h === "object") {
    return Object.keys(h as Record<string, string>).some(
      (k) => k.toLowerCase() === lc
    );
  }
  return false;
}

/**
 * Same-origin `/api/*` BFF calls from the browser with retries for cold starts
 * and transient 5xx from the Worker. Auto-attaches `Authorization` from
 * localStorage so signed-in admins bypass the edge cache and always see fresh
 * data after writes.
 */
export async function fetchBffJson<T>(
  path: string,
  init?: RequestInit,
  opts?: { maxAttempts?: number }
): Promise<T> {
  const maxAttempts = opts?.maxAttempts ?? 5;
  let lastErr = new Error("fetch failed");

  const finalInit: RequestInit = { ...init, cache: "no-store" };
  if (!hasHeader(init, "Authorization")) {
    const token = getStoredToken();
    if (token) {
      finalInit.headers = {
        ...(init?.headers as Record<string, string> | undefined),
        Authorization: `Bearer ${token}`,
      };
    }
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(path, finalInit);
      if (!response.ok) {
        if (shouldRetryStatus(response.status) && attempt < maxAttempts) {
          await sleep(300 * attempt);
          continue;
        }
        const text = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      }
      return (await response.json()) as T;
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      const msg = lastErr.message;
      const isHttp5 =
        msg.startsWith("HTTP 5") || msg.includes("HTTP 429");
      const isNetwork =
        e instanceof TypeError ||
        (e instanceof DOMException && e.name === "AbortError");
      if (attempt < maxAttempts && (isNetwork || isHttp5)) {
        await sleep(300 * attempt);
        continue;
      }
      throw lastErr;
    }
  }
  throw lastErr;
}
