"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Public routes
router.get("/", courseController_1.getAllCourses);
router.get("/:id", courseController_1.getCourseById);
// Protected routes (require authentication)
router.post("/", courseController_1.createCourse); // Temporarily removed auth for testing
router.put("/:id", authMiddleware_1.default, courseController_1.updateCourse);
router.delete("/:id", courseController_1.deleteCourse); // Temporarily removed authMiddleware for testing
exports.default = router;
