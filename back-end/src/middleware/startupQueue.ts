import { Request, Response, NextFunction } from "express";

// Simple startup gate: while warmingUp is true, requests are served sequentially
// by a promise chain. After warm-up completes, middleware becomes a no-op.

export function createStartupQueueMiddleware(isWarmingUpRef: {
  value: boolean;
}) {
  let queue = Promise.resolve<void>(undefined);

  return function startupQueue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!isWarmingUpRef.value) {
      return next();
    }

    const proceed = () =>
      new Promise<void>((resolve) => {
        // Serialize handlers during warm-up; keep it minimal to avoid long waits
        next();
        resolve();
      });

    queue = queue.then(proceed, proceed);
  };
}
