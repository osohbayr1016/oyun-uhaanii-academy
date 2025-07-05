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
router.post("/", createProduct); // Temporarily removed authMiddleware for testing
router.put("/:id", updateProduct); // Temporarily removed authMiddleware for testing
router.delete("/:id", deleteProduct); // Temporarily removed authMiddleware for testing

export default router;
