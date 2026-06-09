import express from "express";
import * as reviewController from "../controllers/review.controllers.js";

const router = express.Router();

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReview);
router.post("/", reviewController.createReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

export default router;
