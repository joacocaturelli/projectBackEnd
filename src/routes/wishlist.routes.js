import express from "express";
import * as wishListController from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, wishListController.getWishlistByUser);
router.post("/add", authMiddleware, wishListController.addToWishlist);
router.delete("/:productId", authMiddleware, wishListController.removeFromWishlist);

export default router;
