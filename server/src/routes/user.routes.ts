import express from "express";
import * as uc from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { adminOrSelf } from "../middlewares/permission.middleware";

const router = express.Router();

router.post("/register", uc.register);
router.post("/verify", uc.verifyUser);
router.post("/login", uc.login);
router.get("/me", auth, uc.getMe);
router.post("/logout", auth, uc.logout);
router.get("/", isAdmin, uc.getUsers);
router.get("/:id", auth, uc.getUserById);
router.patch("/:id", adminOrSelf, uc.updateUser);
router.delete("/:id", isAdmin, uc.deleteUser);
router.post("/forgot-password", uc.forgotPassword);
router.post("/reset-password", uc.setNewPassword);

export default router;
