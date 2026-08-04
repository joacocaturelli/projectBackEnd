import * as cartService from "../services/cart.service.js";
import { needNumber } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const getCart = async (req, res, next) => {
  const { id } = res.locals;

  const result = await cartService.getCart(id);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const { id: userId } = res.locals;

  const result = await cartService.getCartById(cartId, userId);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const addItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = res.locals;

  let validateQuantity;
  if (quantity !== undefined) {
    const quantityResult = needNumber(quantity, { integer: true });

    if (!quantityResult.ok) return next(Selector.BAD_INPUT);
    validateQuantity = quantityResult.content;
  }

  const result = await cartService.addItem(id, productId, validateQuantity);

  if (result.error) return next(Selector.BAD_INPUT);
  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const removeItem = async (req, res, next) => {
  const { productId } = req.body;
  const { id } = res.locals;

  const result = await cartService.removeItem(id, productId);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const checkOut = async (req, res, next) => {
  const { id } = res.locals;

  const result = await cartService.checkOut(id);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};
