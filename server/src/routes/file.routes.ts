import express from "express";
import * as uc from "../controllers/file.controller";
import { auth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/", uc.createFile);
router.get("/", isAdmin, uc.getFiles);
router.get("/:id", auth, uc.getFileById);
router.get("/application/:applicationId", auth, uc.getFileByApplicationId);
router.delete("/:id", auth, uc.deleteFile);

export default router;
