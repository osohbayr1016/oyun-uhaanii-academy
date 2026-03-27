import { Hono } from "hono";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllProducts);
r.get("/:id", getProductById);
r.post("/", createProduct);
r.put("/:id", updateProduct);
r.delete("/:id", deleteProduct);

export default r;
