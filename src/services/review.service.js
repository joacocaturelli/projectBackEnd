import { Review } from "../models/review.model.js";

export const getReviews = async () => {
  return await Review.find();
};

export const getReviewById = async (id) => {
  return await Review.findById(id);
};

export const getReviewByMovie = async (movieId) => {
  return await Review.find({ movieId });
};

export const createReview = async (data) => {
  return await Review.create(data);
};

export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
