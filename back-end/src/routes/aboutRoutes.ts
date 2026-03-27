import { Hono } from "hono";
import {
  getAboutPageContent,
  updateAboutPageContent,
  deleteAboutPageContent,
  seedAboutPageContent,
} from "../controllers/aboutController";
import authenticateToken, { requireAdmin } from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAboutPageContent);
r.put("/", authenticateToken, requireAdmin, updateAboutPageContent);
r.delete("/:section", authenticateToken, requireAdmin, deleteAboutPageContent);
r.post("/seed", authenticateToken, requireAdmin, seedAboutPageContent);

export default r;
