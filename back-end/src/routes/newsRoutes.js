"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = require("../controllers/newsController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Public routes
router.get("/", newsController_1.getAllNews);
router.get("/:id", newsController_1.getNewsById);
// Protected routes (require authentication)
router.post("/", authMiddleware_1.default, newsController_1.createNews);
router.put("/:id", authMiddleware_1.default, newsController_1.updateNews);
router.delete("/:id", authMiddleware_1.default, newsController_1.deleteNews);
exports.default = router;
