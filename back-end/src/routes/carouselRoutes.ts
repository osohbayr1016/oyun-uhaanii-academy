import { Hono } from "hono";
import {
  getCarouselImages,
  addCarouselImage,
  deleteCarouselImage,
} from "../controllers/carouselController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getCarouselImages);
r.post("/", authenticateToken, requireAdmin, addCarouselImage);
r.delete("/:id", authenticateToken, requireAdmin, deleteCarouselImage);

export default r;
