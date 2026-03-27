import { Hono } from "hono";
import {
  getCarouselImages,
  addCarouselImage,
  deleteCarouselImage,
} from "../controllers/carouselController";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getCarouselImages);
r.post("/", addCarouselImage);
r.delete("/:id", deleteCarouselImage);

export default r;
