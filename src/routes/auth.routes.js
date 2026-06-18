import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", validate.createUser, authController.register);
router.post("/login", validate.loginOneUser, authController.login);
router.post("/logout", authMiddleware, authController.logout);

export default router;
