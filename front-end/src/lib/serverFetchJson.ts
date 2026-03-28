import { fetchWithTimeout } from "./fetchWithTimeout";
import { getApiBaseUrl } from "./env";
import { isNextBuildPhase } from "./isNextBuildPhase";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(
  status: number,
  attempt: number,
  maxAttempts: number
) {
  if (attempt >= maxAttempts) return false;
  return status === 429 || status === 503 || status >= 500;
}

export type ServerFetchJsonOptions<T> = {
  revalidateSeconds?: number | false;
  cache?: RequestCache;
  init?: RequestInit;
  timeoutMs?: number;
  /** If set, never throw: use during `next build` and when the Worker/API is down. */
  fallbackOnError?: T;
};

export async function serverFetchJson<T>(
  path: string,
  options?: ServerFetchJsonOptions<T>
): Promise<T> {
  const {
    revalidateSeconds,
    cache,
    init,
    timeoutMs,
    fallbackOnError,
  } = options ?? {};

  if (isNextBuildPhase() && fallbackOnError !== undefined) {
    return fallbackOnError;
  }

  const base = path.startsWith("http") ? "" : getApiBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path}`;

  const resolvedCache = cache ?? "no-store";
  const useRevalidate =
    resolvedCache !== "no-store" && typeof revalidateSeconds === "number";

  const maxAttempts = 5;
  let lastErr: Error = new Error("serverFetchJson failed");

  try {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetchWithTimeout(url, {
          ...(init || {}),
          next: useRevalidate
            ? { revalidate: revalidateSeconds as number }
            : undefined,
          cache: resolvedCache,
          headers: {
            Accept: "application/json",
            ...(init?.headers || {}),
          },
          timeoutMs: timeoutMs ?? 20_000,
        } as Parameters<typeof fetchWithTimeout>[1]);

        if (!response.ok) {
          if (shouldRetryStatus(response.status, attempt, maxAttempts)) {
            await sleep(300 * attempt);
            continue;
          }
          const text = await response.text().catch(() => "");
          throw new Error(`Fetch failed ${response.status}: ${text}`);
        }

        return (await response.json()) as T;
      } catch (e) {
        lastErr = e instanceof Error ? e : new Error(String(e));
        const isAbort = lastErr.name === "AbortError";
        const isNetwork = e instanceof TypeError;
        if (attempt < maxAttempts && (isAbort || isNetwork)) {
          await sleep(300 * attempt);
          continue;
        }
        throw lastErr;
      }
    }

    throw lastErr;
  } catch (e) {
    if (fallbackOnError !== undefined) {
      console.error("[serverFetchJson] failed, using fallback:", path, e);
      return fallbackOnError;
    }
    throw e;
  }
}
