/// <reference types="@cloudflare/workers-types" />

import { createApp } from "./hono/createApp";
import { initPrisma, getPrisma } from "./utils/prisma";
import { ensureDatabaseReady } from "./utils/dbReady";
import { performBackendWarmup } from "./utils/warmup";
import {
  readPublicCache,
  writePublicCache,
  invalidatePublicCacheFor,
  isCacheInvalidatingMutation,
} from "./utils/publicCache";
import type { WorkerBindings } from "./types/bindings";

const app = createApp();

function jsonError(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(
    request: Request,
    env: WorkerBindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const cs = env.HYPERDRIVE?.connectionString;
      if (!cs || typeof cs !== "string" || !cs.trim()) {
        return jsonError(503, { error: "Database binding missing or invalid" });
      }
      initPrisma(cs);

      try {
        await ensureDatabaseReady();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Database unavailable";
        console.error("[worker] ensureDatabaseReady failed:", e);
        return jsonError(503, {
          error: "Database unavailable",
          details: msg,
        });
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

      const cached = await readPublicCache(request);
      if (cached) return cached;

      let response: Response;
      try {
        response = await app.fetch(request, env, ctx);
      } catch (appErr) {
        const msg =
          appErr instanceof Error ? appErr.message : String(appErr ?? "error");
        console.error("[worker] app.fetch threw:", appErr);
        return jsonError(500, { error: msg });
      }

      writePublicCache(request, response, ctx);

      if (isCacheInvalidatingMutation(request) && response.ok) {
        invalidatePublicCacheFor(request, ctx);
      }

      return response;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e ?? "Worker error");
      console.error("[worker] unhandled:", e);
      return jsonError(500, { error: msg });
    }
  },
};
