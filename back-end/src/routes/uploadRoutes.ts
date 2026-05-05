import { Hono } from "hono";
import type { AppEnv } from "../hono/appEnv";
import authenticateToken, { requireAdmin } from "../middleware/authMiddleware";
import { postUpload, getUpload } from "../controllers/uploadController";

const uploadRoutes = new Hono<AppEnv>();

uploadRoutes.get("/:key{.+}", getUpload);
uploadRoutes.post("/", authenticateToken, requireAdmin, postUpload);

export default uploadRoutes;
