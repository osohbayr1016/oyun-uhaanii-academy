import { Hono } from "hono";
import {
  getAdminStats,
  getAllUsers,
  getRecentActivities,
} from "../controllers/adminController";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.use("*", authenticateToken);
r.get("/stats", getAdminStats);
r.get("/users", getAllUsers);
r.get("/activities", getRecentActivities);

export default r;
