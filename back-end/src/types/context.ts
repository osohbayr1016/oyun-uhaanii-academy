import type { Context } from "hono";
import type { HonoVariables, WorkerBindings } from "./bindings";

export type PublicCtx = Context<{ Bindings: WorkerBindings }>;
export type AppCtx = Context<{
  Bindings: WorkerBindings;
  Variables: HonoVariables;
}>;
