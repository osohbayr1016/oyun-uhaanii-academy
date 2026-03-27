/// <reference types="@cloudflare/workers-types" />

import { createApp } from "./hono/createApp";
import { initPrisma } from "./utils/prisma";
import type { WorkerBindings } from "./types/bindings";

const app = createApp();

export default {
  fetch(request: Request, env: WorkerBindings, ctx: ExecutionContext) {
    initPrisma(env.HYPERDRIVE.connectionString);
    return app.fetch(request, env, ctx);
  },
};
