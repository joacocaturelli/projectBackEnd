import express from "express";
import * as userControllers from "../controllers/users.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requireRole.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, userControllers.getProfile);
router.get("/", authMiddleware, requiredRole, userControllers.getUsers);
router.get("/:id", authMiddleware, requiredRole, userControllers.getUserById);
router.put("/:id", authMiddleware, requiredRole, validate.updateUser, userControllers.updateUser);
router.delete("/:id", authMiddleware, requiredRole, userControllers.deleteUser);

export default router;
