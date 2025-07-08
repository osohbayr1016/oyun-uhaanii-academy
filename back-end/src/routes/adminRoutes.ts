import { Router } from "express";
import {
  getAdminStats,
  getAllUsers,
  getRecentActivities,
} from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Only allow admins to access this route
router.get("/stats", authMiddleware, getAdminStats);
router.get("/users", authMiddleware, getAllUsers);
router.get("/activities", authMiddleware, getRecentActivities);

export default router;
