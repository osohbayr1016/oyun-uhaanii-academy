/// <reference types="@cloudflare/workers-types" />

import { createApp } from "./hono/createApp";
import { initPrisma, getPrisma } from "./utils/prisma";
import { ensureDatabaseReady } from "./utils/dbReady";
import { performBackendWarmup } from "./utils/warmup";
import type { WorkerBindings } from "./types/bindings";

const app = createApp();

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
      return await app.fetch(request, env, ctx);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Worker error";
      console.error("[worker] unhandled:", e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
