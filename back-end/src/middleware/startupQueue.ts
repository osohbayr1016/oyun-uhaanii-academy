import { createMiddleware } from "hono/factory";

export function createStartupQueueMiddleware(isWarmingUpRef: {
  value: boolean;
}) {
  let tail = Promise.resolve();

  return createMiddleware(async (c, next) => {
    if (!isWarmingUpRef.value) {
      await next();
      return;
    }
    const run = () => next();
    const p = tail.then(run, run);
    tail = p.catch(() => undefined);
    await p;
  });
}
