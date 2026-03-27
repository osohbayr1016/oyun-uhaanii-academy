import { Hono } from "hono";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllNews);
r.get("/:id", getNewsById);
r.post("/", authenticateToken, createNews);
r.put("/:id", authenticateToken, updateNews);
r.delete("/:id", authenticateToken, deleteNews);

export default r;
