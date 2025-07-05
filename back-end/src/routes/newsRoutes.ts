import express from "express";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Protected routes (require authentication)
router.post("/", authMiddleware, createNews);
router.put("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);

export default router;
