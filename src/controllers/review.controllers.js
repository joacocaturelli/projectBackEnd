import * as reviewService from "../services/review.service.js";
import { needNumber } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const getReviewByUser = async (req, res, next) => {
  const { id } = res.locals;
  const result = await reviewService.getReviewByUser(id);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getReviewByProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const result = await reviewService.getReviewByProduct(productId);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const createReviewByProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const { rating, comment } = req.body;
  const { id } = res.locals;

  const ratingResult = needNumber(rating);

  if (!ratingResult.ok) return next(Selector.BAD_INPUT);

  const result = await reviewService.createReview(id, productId, rating, comment);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const createReview = async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const { id } = res.locals;

  const ratingResult = needNumber(rating);

  if (!ratingResult.ok) return next(Selector.BAD_INPUT);

  const result = await reviewService.createReview(id, productId, rating, comment);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const updateReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const { id } = res.locals;
  const { productId } = req.params;

  const ratingResult = needNumber(rating);

  if (!ratingResult.ok) return next(Selector.BAD_INPUT);

  const result = await reviewService.updateReview(id, productId, { rating, comment });

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const deleteReview = async (req, res, next) => {
  const { productId } = req.params;
  const { id } = res.locals;

  const result = await reviewService.deleteReview(id, productId);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: {
      "Review eliminada": result.content,
    },
  });
};
