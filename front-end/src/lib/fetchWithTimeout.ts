export type FetchWithTimeoutInit = RequestInit & {
  timeoutMs?: number;
  // Allow Next.js extended init
  // eslint-disable-next-line @typescript-eslint/ban-types
  next?: { revalidate?: number } & {};
};

export async function fetchWithTimeout(
  url: string,
  init?: FetchWithTimeoutInit
): Promise<Response> {
  const { timeoutMs = 8000, ...rest } = init || {};

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...(rest as RequestInit),
      signal: controller.signal,
    } as RequestInit & { next?: { revalidate?: number } });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

