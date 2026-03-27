import type { WorkerBindings } from "../types/bindings";

/** Comma-separated origins in CORS_ORIGIN (e.g. www + apex). */
function expandCorsOrigins(raw?: string): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

export function allowedOriginsList(env: WorkerBindings | undefined): string[] {
  const fromBindings = expandCorsOrigins(env?.CORS_ORIGIN);
  const fromProcess = expandCorsOrigins(process.env.CORS_ORIGIN);
  return [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    ...fromBindings,
    ...fromProcess,
  ];
}

export function corsOriginResolver(env: WorkerBindings | undefined) {
  return (origin: string) => {
    const allowed = allowedOriginsList(env);
    if (!origin) return allowed[0] ?? "http://localhost:3000";
    return allowed.includes(origin) ? origin : null;
  };
}
