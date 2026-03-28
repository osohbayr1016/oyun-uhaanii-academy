/// <reference types="@cloudflare/workers-types" />

import { createApp } from "./hono/createApp";
import { initPrisma, getPrisma } from "./utils/prisma";
import { ensureDatabaseReady } from "./utils/dbReady";
import { performBackendWarmup } from "./utils/warmup";
import type { WorkerBindings } from "./types/bindings";

const app = createApp();

const PUBLIC_CACHE_PREFIXES = [
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

export default {
  async fetch(
    request: Request,
    env: WorkerBindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const cs = env.HYPERDRIVE?.connectionString;
      if (!cs || typeof cs !== "string" || !cs.trim()) {
        return new Response(
          JSON.stringify({ error: "Database binding missing or invalid" }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      initPrisma(cs);
      try {
        await ensureDatabaseReady();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Database unavailable";
        console.error("[worker] ensureDatabaseReady failed:", e);
        return new Response(
          JSON.stringify({ error: "Database unavailable", details: msg }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      try {
        ctx.waitUntil(
          performBackendWarmup(getPrisma()).catch((err) =>
            console.error("[worker] background warmup:", err)
          )
        );
      } catch {
        /* no executionCtx */
      }

      // Serve cached responses for public GET endpoints
      const url = new URL(request.url);
      const isPublicGet =
        request.method === "GET" &&
        PUBLIC_CACHE_PREFIXES.some((p) => url.pathname.startsWith(p));

      if (isPublicGet) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cached = await (caches as any).default.match(request);
          if (cached) return cached as Response;
        } catch {
          /* cache miss or unavailable — continue to app */
        }
      }

      let response: Response;
      try {
        response = await app.fetch(request, env, ctx);
      } catch (appErr) {
        const msg =
          appErr instanceof Error ? appErr.message : String(appErr ?? "error");
        console.error("[worker] app.fetch threw:", appErr);
        return new Response(JSON.stringify({ error: msg }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Store successful public GET responses in cache
      if (isPublicGet && response.status === 200) {
        try {
          const toCache = new Response(response.clone().body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers),
          });
          toCache.headers.set(
            "Cache-Control",
            "public, max-age=60, s-maxage=60"
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ctx.waitUntil((caches as any).default.put(request, toCache));
        } catch {
          /* non-fatal: cache write failure */
        }
      }

      return response;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e ?? "Worker error");
      console.error("[worker] unhandled:", e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
