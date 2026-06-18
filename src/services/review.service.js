import { Review } from "../models/review.model.js";
import { getAllProducts } from "./products.service.js";

export const getReviewByUser = async (userId) => {
  try {
    const result = await Review.find({ userId }, { productId: true, rating: true, comment: true, _id: false });

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error showing all reviews", error.message);
    return {
      ok: false,
      content: [],
    };
  }
};

export const createReview = async (userId, productId, rating, comment) => {
  try {
    const result = await Review.create({ userId, productId, rating, comment });

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error al crear la review", error.message);
    return {
      ok: false,
    };
  }
};

export const updateReview = async (userId, productId, data) => {
  try {
    const result = await Review.findOneAndUpdate(
      { userId, productId },
      { $set: { rating: data.rating, comment: data.comment } },
      { new: true },
    );

    if (!result) throw new Error("Review not found");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error updating review", error.message);
    return {
      ok: false,
    };
  }
};

export const deleteReview = async (userId, productId) => {
  try {
    const result = await Review.findOneAndDelete({ userId, productId });

    if (!result) throw new Error("Not found");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error deleting review", error.message);
    return {
      ok: false,
    };
  }
};
