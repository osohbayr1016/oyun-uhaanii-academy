import type { MiddlewareHandler } from "hono";
import { performBackendWarmup } from "../utils/warmup";
import { getPrisma } from "../utils/prisma";

export function createWarmupMiddleware(isWarmingUp: {
  value: boolean;
}): MiddlewareHandler {
  let completed = false;

  return async (c, next) => {
    if (!completed) {
      await performBackendWarmup(getPrisma());
      completed = true;
      isWarmingUp.value = false;
    }
    await next();
  };
}
