import express from "express";
import {
  getAboutPageContent,
  updateAboutPageContent,
  deleteAboutPageContent,
  seedAboutPageContent,
} from "../controllers/aboutController";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Public route to get about page content
router.get("/", getAboutPageContent);

// Admin routes (protected)
router.put("/", authenticateToken, requireAdmin, updateAboutPageContent);
router.delete(
  "/:section",
  authenticateToken,
  requireAdmin,
  deleteAboutPageContent
);
router.post("/seed", authenticateToken, requireAdmin, seedAboutPageContent);

export default router;
