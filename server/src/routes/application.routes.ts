import express from "express";
import * as uc from "../controllers/application.controller";
import { auth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/", auth, uc.createApplication);
router.get("/", isAdmin, uc.getApplications);
router.get("/:id", auth, uc.getApplicationById);
router.patch("/:id", auth, uc.updateApplication);
router.delete("/:id", auth, uc.deleteApplication);
router.get("/user/:userId", auth, uc.getApplicationsByUserId);

export default router;
