import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "./controllers/productController";
import authMiddleware from "../middleware/authMiddleware"; // Protect some routes

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct); // Example: Only authenticated users can create products

export default router;
