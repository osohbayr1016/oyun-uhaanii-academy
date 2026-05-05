/// <reference types="@cloudflare/workers-types" />

/**
 * Edge-cache helpers for public GET endpoints, with write-through invalidation
 * so admin POST/PUT/DELETE never leaves stale data sitting in `caches.default`.
 *
 * Notes:
 * - `caches.default` is per Cloudflare POP, so "stale on one POP, fresh on
 *   another" is normal. Short TTL + invalidation is what bounds the window.
 * - We skip caching for any request that carries `Authorization`, so admin
 *   pages always read fresh data.
 */

export const PUBLIC_CACHE_PREFIXES = [
  "/api/news",
  "/api/products",
  "/api/courses",
  "/api/tournaments",
  "/api/carousel",
  "/api/home-content",
  "/api/about",
  "/api/club",
  "/api/course-filters/categories",
  "/api/course-filters/levels",
];

/** Short TTL bounds staleness when invalidation misses (e.g. waitUntil races). */
export const PUBLIC_CACHE_TTL_SECONDS = 15;

export function publicCachePrefixFor(pathname: string): string | null {
  for (const p of PUBLIC_CACHE_PREFIXES) {
    if (pathname === p || pathname.startsWith(`${p}/`)) return p;
  }
  return null;
}

export function isPublicCacheableGet(request: Request): boolean {
  if (request.method !== "GET") return false;
  if (request.headers.get("Authorization")) return false;
  const url = new URL(request.url);
  return publicCachePrefixFor(url.pathname) !== null;
}

export function isCacheInvalidatingMutation(request: Request): boolean {
  const m = request.method;
  if (m === "GET" || m === "HEAD" || m === "OPTIONS") return false;
  const url = new URL(request.url);
  return publicCachePrefixFor(url.pathname) !== null;
}

function defaultCache(): Cache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (caches as any).default as Cache;
}

export async function readPublicCache(
  request: Request
): Promise<Response | null> {
  if (!isPublicCacheableGet(request)) return null;
  try {
    const hit = await defaultCache().match(request);
    return hit ?? null;
  } catch {
    return null;
  }
}

export function writePublicCache(
  request: Request,
  response: Response,
  ctx: ExecutionContext
): void {
  if (!isPublicCacheableGet(request)) return;
  if (response.status !== 200) return;
  try {
    const headers = new Headers(response.headers);
    headers.set(
      "Cache-Control",
      `public, max-age=${PUBLIC_CACHE_TTL_SECONDS}, s-maxage=${PUBLIC_CACHE_TTL_SECONDS}`
    );
    headers.set("Vary", "Authorization");
    const toCache = new Response(response.clone().body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    ctx.waitUntil(defaultCache().put(request, toCache));
  } catch {
    /* non-fatal: cache write failure */
  }
}

/**
 * Best-effort delete after a successful mutation. Cloudflare's default cache
 * does not support tag/prefix deletes, so we delete:
 *   - the bare list endpoint (e.g. `/api/courses`)
 *   - the exact request path (covers `/api/courses/:id`)
 * Any extra cache variants (filtered/paginated query strings) age out within
 * `PUBLIC_CACHE_TTL_SECONDS`.
 */
export function invalidatePublicCacheFor(
  request: Request,
  ctx: ExecutionContext
): void {
  const url = new URL(request.url);
  const prefix = publicCachePrefixFor(url.pathname);
  if (!prefix) return;
  const targets = new Set<string>();
  targets.add(`${url.origin}${prefix}`);
  targets.add(`${url.origin}${url.pathname}`);
  const cache = defaultCache();
  const tasks = [...targets].map((t) => cache.delete(t).catch(() => false));
  ctx.waitUntil(Promise.all(tasks));
}
