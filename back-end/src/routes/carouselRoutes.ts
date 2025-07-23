import express from "express";
import {
  getCarouselImages,
  addCarouselImage,
  deleteCarouselImage,
} from "../controllers/carouselController";
const router = express.Router();

router.get("/", getCarouselImages);
router.post("/", addCarouselImage);
router.delete("/:id", deleteCarouselImage);

export default router;
