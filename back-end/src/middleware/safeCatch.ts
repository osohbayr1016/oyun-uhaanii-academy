import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../hono/appEnv";

/** Ensures thrown errors become JSON 500 instead of bubbling to Cloudflare 1101. */
export const safeCatchMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error("[safeCatch]", err);
    return c.json(
      {
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      500
    );
  }
});
