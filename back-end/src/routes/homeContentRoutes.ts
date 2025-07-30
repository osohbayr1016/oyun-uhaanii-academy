import express from "express";
import {
  getHomeContent,
  createHomeContent,
  updateHomeContent,
} from "../controllers/homeContentController";

const router = express.Router();

// GET /api/home-content
router.get("/", getHomeContent);

// POST /api/home-content
router.post("/", createHomeContent);

// PUT /api/home-content
router.put("/", updateHomeContent);

export default router; 