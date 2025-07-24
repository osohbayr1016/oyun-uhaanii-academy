import { Router } from "express";
import {
  getAllClubContent,
  getClubContentBySection,
  getClubContentByKey,
  createClubContent,
  updateClubContent,
  deleteClubContent,
} from "../controllers/clubContentController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// All routes require admin
router.use(authMiddleware);

router.get("/", getAllClubContent);
router.get("/section/:section", getClubContentBySection);
router.get("/:key", getClubContentByKey);
router.post("/", createClubContent);
router.put("/:key", updateClubContent);
router.delete("/:key", deleteClubContent);

export default router;
