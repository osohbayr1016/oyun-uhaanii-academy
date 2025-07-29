import express from "express";
import {
  getClubContent,
  updateClubContent,
  uploadClubImage,
} from "../controllers/clubController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getClubContent);

// Protected routes (admin only)
router.put("/", authenticateToken, updateClubContent);
router.post("/upload", authenticateToken, uploadClubImage);

export default router;
