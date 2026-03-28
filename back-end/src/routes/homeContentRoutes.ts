import { Hono } from "hono";
import {
  getHomeContent,
  createHomeContent,
  updateHomeContent,
} from "../controllers/homeContentController";
import { getHomeStats } from "../controllers/homeStatsController";
import { putOfficerSectorStats } from "../controllers/officerSectorStatsController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/stats", getHomeStats);
r.put("/officer-stats", authenticateToken, requireAdmin, putOfficerSectorStats);
r.get("/", getHomeContent);
r.post("/", authenticateToken, requireAdmin, createHomeContent);
r.put("/", authenticateToken, requireAdmin, updateHomeContent);

export default r;
