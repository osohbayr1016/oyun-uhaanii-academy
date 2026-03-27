import type { ErrorHandler } from "hono";
import type { AppEnv } from "./appEnv";

export const createOnError = (): ErrorHandler<AppEnv> => {
  return (err, c) => {
    console.error("Global error handler caught:", {
      error: err.message,
      stack: err.stack,
      url: c.req.url,
      method: c.req.method,
      timestamp: new Date().toISOString(),
    });

    if (err.name === "PrismaClientKnownRequestError") {
      return c.json(
        {
          message: "Database operation failed",
          error: "Invalid request to database",
        },
        400
      );
    }

    if (err.name === "PrismaClientUnknownRequestError") {
      return c.json(
        {
          message: "Database error",
          error: "Unknown database error occurred",
        },
        500
      );
    }

    if (err.name === "ValidationError") {
      return c.json(
        {
          message: "Validation error",
          error: err.message,
        },
        400
      );
    }

    const isProd =
      c.env?.NODE_ENV === "production" || process.env.NODE_ENV === "production";
    return c.json(
      {
        message: "Internal server error",
        error: isProd ? "Something went wrong" : err.message,
      },
      500
    );
  };
};
