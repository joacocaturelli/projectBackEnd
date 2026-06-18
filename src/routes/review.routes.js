import express from "express";
import * as reviewController from "../controllers/review.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, reviewController.getReviewByUser);
router.post("/", authMiddleware, validate.createReview, reviewController.createReview);
router.put("/:productId", authMiddleware, validate.updateReview, reviewController.updateReview);
router.delete("/:productId", authMiddleware, reviewController.deleteReview);

export default router;
