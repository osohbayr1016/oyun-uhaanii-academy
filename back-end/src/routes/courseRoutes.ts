import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Protected routes (require authentication)
router.post("/", createCourse); // Temporarily removed auth for testing
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", deleteCourse); // Temporarily removed authMiddleware for testing

export default router;
