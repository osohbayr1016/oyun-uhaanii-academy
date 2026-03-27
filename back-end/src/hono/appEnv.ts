import type { HonoVariables, WorkerBindings } from "../types/bindings";

export type AppEnv = {
  Bindings: WorkerBindings;
  Variables: HonoVariables;
};
