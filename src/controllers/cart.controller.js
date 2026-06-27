import * as cartService from "../services/cart.service.js";
import { needNumber } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const getCart = async (req, res, next) => {
  const { id } = res.locals;

  const result = await cartService.getCart(id);

  if (!result.ok) return next(Selector.BAD_ERROR);

  res.json({
    ok: true,
    data: result.content,
  });
};

export const getCartById = async (req, res, next) => {
  const id = req.params.cartId;

  const result = await cartService.getCartById(id);

  if (!result.ok) return next(Selector.NOT_FOUND);

  res.json({
    ok: true,
    data: result.content,
  });
};

export const addItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = res.locals;

  const resultQuantity = needNumber(quantity);
  if (!resultQuantity.ok) return next(Selector.BAD_INPUT);

  const result = await cartService.addItem(id, productId, resultQuantity.content);

  if (!result.ok) return next(Selector.BAD_ERROR);

  res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const checkOut = async (req, res, next) => {
  const { id } = res.locals;

  const result = await cartService.checkOut(id);

  if (!result) return next(Selector.BAD_ERROR);

  res.json({
    ok: true,
    data: result.content,
  });
};
