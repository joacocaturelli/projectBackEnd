import prisma from "../config/prismaClient.js";
import { Review } from "../models/review.model.js";
import { getAllProducts } from "./products.service.js";
import { isNumber } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const getReviewByUser = async (userId) => {
  try {
    const result = await Review.find(
      { userId },
      {
        productId: true,
        rating: true,
        comment: true,
        _id: false,
      },
    );

    if (!result) throw new Error(Selector.BAD_ERROR);

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error showing all reviews", error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const getReviewByProduct = async (productId) => {
  try {
    const id = isNumber(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error(Selector.NOT_FOUND);

    const result = await Review.find(
      { productId },
      {
        rating: true,
        comment: true,
        _id: false,
      },
    );

    if (!result) throw new Error(Selector.BAD_ERROR);

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error al obtener las reviews del producto", error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const createReview = async (userId, productId, rating, comment) => {
  try {
    const id = isNumber(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error(Selector.NOT_FOUND);

    const result = await Review.create({ userId, productId, rating, comment });

    if (!result) throw new Error(Selector.BAD_ERROR);

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error al crear la review", error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const updateReview = async (userId, productId, data) => {
  try {
    const id = isNumber(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error(Selector.NOT_FOUND);

    const result = await Review.findOneAndUpdate(
      { userId, productId },
      { $set: { rating: data.rating, comment: data.comment } },
      { new: true },
    );

    if (!result) throw new Error(Selector.NOT_FOUND);

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error updating review", error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const deleteReview = async (userId, productId) => {
  try {
    const id = isNumber(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error(Selector.NOT_FOUND);

    const result = await Review.findOneAndDelete({ userId, productId });

    if (!result) throw new Error(Selector.NOT_FOUND);

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error deleting review", error.message);
    return {
      ok: false,
      error: error.message,
    };
  }
};
