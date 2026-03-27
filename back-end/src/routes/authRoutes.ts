import { Hono } from "hono";
import { register, login } from "../controllers/authController";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.post("/register", register);
r.post("/login", login);

export default r;
