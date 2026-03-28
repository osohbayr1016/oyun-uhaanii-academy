function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status === 503 || status >= 500;
}

/**
 * Same-origin `/api/*` BFF calls from the browser with retries for cold starts
 * and transient 5xx from the Worker.
 */
export async function fetchBffJson<T>(
  path: string,
  init?: RequestInit,
  opts?: { maxAttempts?: number }
): Promise<T> {
  const maxAttempts = opts?.maxAttempts ?? 5;
  let lastErr = new Error("fetch failed");

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(path, {
        ...init,
        cache: "no-store",
      });
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
