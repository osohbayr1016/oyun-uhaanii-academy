import { Hono } from "hono";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllProducts);
r.get("/:id", getProductById);
r.post("/", authenticateToken, requireAdmin, createProduct);
r.put("/:id", authenticateToken, requireAdmin, updateProduct);
r.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

export default r;
