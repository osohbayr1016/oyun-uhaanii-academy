import { createMiddleware } from "hono/factory";
import { getPrisma } from "../utils/prisma";
import { verifyUserToken } from "../utils/jwt";
import type { WorkerBindings, HonoVariables } from "../types/bindings";

function jwtSecretFromEnv(env: WorkerBindings | undefined): string {
  return (
    env?.JWT_SECRET ??
    process.env.JWT_SECRET ??
    "supersecret"
  );
}

/** DB/seed may use `admin`, `ADMIN`, etc. */
export function isAdminRole(role: string | null | undefined): boolean {
  return typeof role === "string" && role.toLowerCase() === "admin";
}

export const authenticateToken = createMiddleware<{
  Bindings: WorkerBindings;
  Variables: HonoVariables;
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "No token, authorization denied" }, 401);
  }
  const token = authHeader.split(" ")[1];
  const secret = jwtSecretFromEnv(c.env);
  const decoded = await verifyUserToken(token, secret);
  if (!decoded) {
    return c.json({ message: "Token is not valid" }, 403);
  }
  c.set("user", decoded);
  await next();
});

export const requireAdmin = createMiddleware<{
  Bindings: WorkerBindings;
  Variables: HonoVariables;
}>(async (c, next) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ message: "Authentication required" }, 401);
  }
  try {
    const dbUser = await getPrisma().user.findUnique({
      where: { id: user.userId },
    });
    if (!dbUser || !isAdminRole(dbUser.role)) {
      return c.json({ message: "Admin access required" }, 403);
    }
    await next();
  } catch (e) {
    console.error("Admin middleware error:", e);
    return c.json({ message: "Server error during admin verification" }, 500);
  }
});

export default authenticateToken;
