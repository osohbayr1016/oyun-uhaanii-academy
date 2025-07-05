import { Router } from "express";
// import {
//   getProducts,
//   getProductById,
//   createProduct,
// } from "./controllers/productController";
import {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import authMiddleware from "../middleware/authMiddleware"; // Protect some routes

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct); // Example: Only authenticated users can create products
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
