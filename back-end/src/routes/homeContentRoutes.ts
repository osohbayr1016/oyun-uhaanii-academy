import { Hono } from "hono";
import {
  getHomeContent,
  createHomeContent,
  updateHomeContent,
} from "../controllers/homeContentController";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getHomeContent);
r.post("/", createHomeContent);
r.put("/", updateHomeContent);

export default r;
