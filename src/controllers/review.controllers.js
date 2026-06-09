import * as reviewService from "../services/review.service.js";

export const getReviews = async (req, res) => {
  const reviews = await reviewService.getReviews();
  res.json({
    ok: true,
    data: reviews,
  });
};

export const getReview = async (req, res) => {
  const reviews = await reviewService.getReviewById(req.params.id);
  res.json({
    ok: true,
    data: reviews,
  });
};

export const createReview = async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(201).json({
    ok: true,
    data: review,
  });
};

export const updateReview = async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, req.body);
  res.json({
    ok: true,
    data: review,
  });
};

export const deleteReview = async (req, res) => {
  const review = await reviewService.deleteReview(req.params.id);
  res.json({
    ok: true,
    data: review,
  });
};
