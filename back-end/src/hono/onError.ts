import type { ErrorHandler } from "hono";
import type { AppEnv } from "./appEnv";

function messageFromUnknown(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (err != null && typeof err === "object" && "message" in err) {
    const m = (err as { message: unknown }).message;
    if (typeof m === "string") return m;
  }
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}

function nameFromUnknown(err: unknown): string {
  if (err instanceof Error) return err.name;
  if (err != null && typeof err === "object" && "name" in err) {
    const n = (err as { name: unknown }).name;
    if (typeof n === "string") return n;
  }
  return "Error";
}

export const createOnError = (): ErrorHandler<AppEnv> => {
  return (err, c) => {
    const message = messageFromUnknown(err);
    const name = nameFromUnknown(err);

    console.error("Global error handler caught:", {
      error: message,
      name,
      url: c.req.url,
      method: c.req.method,
      timestamp: new Date().toISOString(),
    });

    if (name === "PrismaClientKnownRequestError") {
      return c.json(
        {
          message: "Database operation failed",
          error: "Invalid request to database",
        },
        400
      );
    }

    if (name === "PrismaClientUnknownRequestError") {
      return c.json(
        {
          message: "Database error",
          error: "Unknown database error occurred",
        },
        500
      );
    }

    if (name === "ValidationError") {
      return c.json(
        {
          message: "Validation error",
          error: message,
        },
        400
      );
    }

    const isProd =
      c.env?.NODE_ENV === "production" || process.env.NODE_ENV === "production";
    return c.json(
      {
        message: "Internal server error",
        error: isProd ? "Something went wrong" : message,
      },
      500
    );
  };
};
