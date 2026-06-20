import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, cartController.getCart);
router.get("/:cartId", authMiddleware, cartController.getCartById);
router.post("/items", authMiddleware, validate.addItem, cartController.addItem);
router.post("/checkout", authMiddleware, cartController.checkOut);

export default router;
