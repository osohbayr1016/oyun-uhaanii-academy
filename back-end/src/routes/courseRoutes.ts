import { Hono } from "hono";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllCourses);
r.get("/:id", getCourseById);
r.post("/", createCourse);
r.put("/:id", authenticateToken, updateCourse);
r.delete("/:id", deleteCourse);

export default r;
