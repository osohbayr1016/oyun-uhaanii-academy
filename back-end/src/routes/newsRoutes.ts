import { Hono } from "hono";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllNews);
r.get("/:id", getNewsById);
r.post("/", authenticateToken, requireAdmin, createNews);
r.put("/:id", authenticateToken, requireAdmin, updateNews);
r.delete("/:id", authenticateToken, requireAdmin, deleteNews);

export default r;
