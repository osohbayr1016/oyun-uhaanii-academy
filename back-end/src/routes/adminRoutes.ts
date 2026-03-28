import { Hono } from "hono";
import {
  getAdminStats,
  getAllUsers,
  getRecentActivities,
} from "../controllers/adminController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.use("*", authenticateToken);
r.use("*", requireAdmin);
r.get("/stats", getAdminStats);
r.get("/users", getAllUsers);
r.get("/activities", getRecentActivities);

export default r;
