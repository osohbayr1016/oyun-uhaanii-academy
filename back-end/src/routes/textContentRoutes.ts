import { Router } from "express";
import {
  getAllTextContents,
  getTextContentByKey,
  createTextContent,
  updateTextContent,
  deleteTextContent,
} from "../controllers/textContentController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// All routes require admin (for now, just use authMiddleware)
router.use(authMiddleware);

router.get("/", getAllTextContents);
router.get("/:key", getTextContentByKey);
router.post("/", createTextContent);
router.put("/:key", updateTextContent);
router.delete("/:key", deleteTextContent);

export default router;
