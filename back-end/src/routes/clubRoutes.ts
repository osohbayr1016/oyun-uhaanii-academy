import { Hono } from "hono";
import {
  getClubContent,
  updateClubContent,
  uploadClubImage,
} from "../controllers/clubController";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getClubContent);
r.put("/", authenticateToken, updateClubContent);
r.post("/upload", authenticateToken, uploadClubImage);

export default r;
