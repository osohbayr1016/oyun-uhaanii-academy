import { Hono } from "hono";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterSubscribers,
  sendWeeklyNewsletter,
  getNewsletterStats,
} from "../controllers/newsletterController";
import authenticateToken, { requireAdmin } from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.post("/subscribe", subscribeToNewsletter);
r.get("/unsubscribe/:token", unsubscribeFromNewsletter);
r.get("/subscribers", authenticateToken, requireAdmin, getNewsletterSubscribers);
r.post("/send", authenticateToken, requireAdmin, sendWeeklyNewsletter);
r.get("/stats", authenticateToken, requireAdmin, getNewsletterStats);

export default r;
