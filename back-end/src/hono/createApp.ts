import { Hono } from "hono";
import { cors } from "hono/cors";
import { corsOriginResolver } from "./corsConfig";
import { createOnError } from "./onError";
import { safeCatchMiddleware } from "../middleware/safeCatch";
import { getPrisma } from "../utils/prisma";
import type { AppEnv } from "./appEnv";
import { mountApiRoutes } from "./mountApiRoutes";

export function createApp() {
  const app = new Hono<AppEnv>();

  app.use("*", async (c, next) => {
    const resolve = corsOriginResolver(c.env);
    return cors({
      origin: (o) => resolve(o),
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })(c, next);
  });

  app.use("*", safeCatchMiddleware);

  mountApiRoutes(app);

  app.get("/", (c) => c.text("Backend API is running!"));

  app.get("/health", async (c) => {
    try {
      await getPrisma().$queryRaw`SELECT 1`;
      return c.json({
        status: "healthy",
        database: "connected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Health check failed:", error);
      return c.json(
        {
          status: "unhealthy",
          database: "disconnected",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
        503
      );
    }
  });

  app.onError(createOnError());
  return app;
}
