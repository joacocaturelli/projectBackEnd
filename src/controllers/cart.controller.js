import * as cartService from "../services/cart.service.js";
import { needNumber } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const getCart = async (req, res, next) => {
  try {
    const { id } = res.locals;

    const result = await cartService.getCart(id);

    if (!result) return next(new Error("No se pudo obtener el carrito"));

    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return {
      ok: false,
    };
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const result = await cartService.getCartById(req.params.cartId);

    if (!result) return next(new Error("No se pudo obtener el carrito"));

    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return {
      ok: false,
    };
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { id } = res.locals;

    const resultQuantity = needNumber(quantity);

    if (!resultQuantity.ok) return next(Selector.BAD_INPUT);

    const result = await cartService.addItem(id, productId, quantity);

    if (!result) return next(new Error("No se pudo añadir el item al carrito"));

    res.status(201).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return {
      ok: false,
    };
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const { id } = res.locals;

    const result = await cartService.checkOut(id);

    if (!result) return next(new Error("No se pudo hacer el check out"));

    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
