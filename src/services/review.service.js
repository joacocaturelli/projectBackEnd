import prisma from "../config/prismaClient.js";
import { Review } from "../models/review.model.js";
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

    if (!result) throw new Error("Reviews no obtenidas desde Mongo");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error showing all reviews", error.message);
    return {
      ok: false,
    };
  }
};

export const getReviewByProduct = async (productId) => {
  try {
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Producto no encontrado desde Prisma");

    const result = await Review.find(
      { productId },
      {
        userId: true,
        rating: true,
        comment: true,
        _id: false,
      },
    );

    if (!result) throw new Error("Reviews no obtenidas desde Mongo");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error al obtener las reviews del producto", error.message);
    return {
      ok: false,
    };
  }
};

export const createReview = async (userId, productId, rating, comment) => {
  try {
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Producto no encontrado desde Prisma");

    const result = await Review.create({ userId, productId, rating, comment });

    if (!result) throw new Error("No se pudo crear la review desde Mongo");

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
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Producto no encontrado desde Prisma");

    const result = await Review.findOneAndUpdate(
      { userId, productId },
      { $set: { rating: data.rating, comment: data.comment } },
      { returnDocument: "after" },
    );

    if (!result) throw new Error("No se pudo actualizar la review desde Mongo");

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
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Producto no encontrado desde Prisma");

    const result = await Review.findOneAndDelete({ userId, productId });

    if (!result) throw new Error("Review no encontada desde Mongo");

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
