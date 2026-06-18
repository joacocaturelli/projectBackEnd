import * as reviewService from "../services/review.service.js";
import { isString } from "../utils/common.utils.js";

export const getReviewByUser = async (req, res, next) => {
  const { id } = res.locals;
  const result = await reviewService.getReviewByUser(id);

  return res.status(200).json({
    ok: true,
    data: result.content,
  });
};

export const createReview = async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const { id } = res.locals;

  const result = await reviewService.createReview(isString(id), productId, rating, comment);

  if (!result.ok) return next(new Error("No se pudo crear la review"));

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const updateReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = res.locals;
  const { productId } = req.params;

  const result = await reviewService.updateReview(isString(id), productId, { rating, comment });

  if (!result.ok) return next(new Error("No se pudo actualizar la review"));

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const deleteReview = async (req, res, next) => {
  const { productId } = req.params;
  const { id } = res.locals;

  const result = await reviewService.deleteReview(isString(id), productId);

  if (!result.ok) return next(new Error("No se pudo eliminar la review"));

  return res.json({
    ok: true,
    data: result.content,
  });
};
