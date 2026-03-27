import type { Context } from "hono";
import bcrypt from "bcryptjs";
import { getPrisma } from "../utils/prisma";
import { signUserToken } from "../utils/jwt";
import type { WorkerBindings } from "../types/bindings";

type AuthCtx = Context<{ Bindings: WorkerBindings }>;

function jwtSecret(c: AuthCtx): string | undefined {
  return c.env.JWT_SECRET ?? process.env.JWT_SECRET;
}

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validatePassword = (password: string) =>
  typeof password === "string" && password.length >= 6;
const validateName = (name: string) =>
  typeof name === "string" && name.trim().length > 0;

export const register = async (c: AuthCtx) => {
  const JWT_SECRET = jwtSecret(c);
  if (!JWT_SECRET) {
    return c.json({ message: "Server misconfiguration" }, 500);
  }
  try {
    const body = await c.req.json<{ email?: string; password?: string; name?: string }>();
    const { email, password, name } = body;

    if (!email || !validateEmail(email)) {
      return c.json({ message: "Valid email is required" }, 400);
    }
    if (!password || !validatePassword(password)) {
      return c.json({ message: "Password must be at least 6 characters" }, 400);
    }
    if (!name || !validateName(name)) {
      return c.json({ message: "Name is required" }, 400);
    }

    const existingUser = await getPrisma().user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return c.json({ message: "User already exists" }, 400);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await getPrisma().user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "user",
      },
    });

    const token = await signUserToken(user.id, JWT_SECRET);

    return c.json(
      {
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      201
    );
  } catch (error: unknown) {
    const err = error as { code?: string; meta?: { target?: string[] } };
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return c.json({ message: "User already exists" }, 400);
    }
    console.error("Registration error:", error);
    return c.json({ message: "Server error during registration" }, 500);
  }
};

export const login = async (c: AuthCtx) => {
  const JWT_SECRET = jwtSecret(c);
  if (!JWT_SECRET) {
    return c.json({ message: "Server misconfiguration" }, 500);
  }
  try {
    const body = await c.req.json<{ email?: string; password?: string }>();
    const { email, password } = body;

    if (!email || !validateEmail(email)) {
      return c.json({ message: "Valid email is required" }, 400);
    }
    if (!password || !validatePassword(password)) {
      return c.json({ message: "Password must be at least 6 characters" }, 400);
    }

    const user = await getPrisma().user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const token = await signUserToken(user.id, JWT_SECRET);

    return c.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ message: "Server error during login" }, 500);
  }
};
