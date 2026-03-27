import { Hono } from "hono";
import {
  getAllTextContents,
  getTextContentByKey,
  createTextContent,
  updateTextContent,
  deleteTextContent,
} from "../controllers/textContentController";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.use("*", authenticateToken);
r.get("/", getAllTextContents);
r.get("/:key", getTextContentByKey);
r.post("/", createTextContent);
r.put("/:key", updateTextContent);
r.delete("/:key", deleteTextContent);

export default r;
