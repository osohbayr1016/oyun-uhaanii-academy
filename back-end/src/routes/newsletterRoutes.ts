import express from "express";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterSubscribers,
  sendWeeklyNewsletter,
  getNewsletterStats,
} from "../controllers/newsletterController";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post("/subscribe", subscribeToNewsletter);
router.get("/unsubscribe/:token", unsubscribeFromNewsletter);

// Admin routes (protected)
router.get(
  "/subscribers",
  authenticateToken,
  requireAdmin,
  getNewsletterSubscribers
);
router.post("/send", authenticateToken, requireAdmin, sendWeeklyNewsletter);
router.get("/stats", authenticateToken, requireAdmin, getNewsletterStats);

export default router;
