import { Hono } from "hono";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllCourses);
r.get("/:id", getCourseById);
r.post("/", authenticateToken, requireAdmin, createCourse);
r.put("/:id", authenticateToken, requireAdmin, updateCourse);
r.delete("/:id", authenticateToken, requireAdmin, deleteCourse);

export default r;
