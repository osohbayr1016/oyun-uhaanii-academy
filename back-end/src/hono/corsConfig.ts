import type { WorkerBindings } from "../types/bindings";

export function allowedOriginsList(env: WorkerBindings | undefined): string[] {
  return [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    env?.CORS_ORIGIN,
    process.env.CORS_ORIGIN,
  ].filter((x): x is string => Boolean(x));
}

export function corsOriginResolver(env: WorkerBindings | undefined) {
  return (origin: string) => {
    const allowed = allowedOriginsList(env);
    if (!origin) return allowed[0] ?? "http://localhost:3000";
    return allowed.includes(origin) ? origin : null;
  };
}
