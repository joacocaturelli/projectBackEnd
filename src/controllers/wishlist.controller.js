import * as wishlistService from "../services/wishlist.service.js";
import { isString } from "../utils/common.utils.js";

export const getWishlistByUser = async (req, res, next) => {
  const { id } = res.locals;

  const result = await wishlistService.getWishlistByUser(id);

  if (!result.ok) return next(new Error("No se pudo obtener la wishlist"));

  return res.status(200).json({
    ok: true,
    data: result.content,
  });
};

export const addToWishlist = async (req, res, next) => {
  const productId = req.params.productId;
  const { id } = res.locals;

  const result = await wishlistService.addToWishlist(isString(id), productId);

  if (!result.ok) return next(new Error("No se pudo añadir a la wishlist"));

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const removeFromWishlist = async (req, res, next) => {
  const { productId } = req.params;
  const { id } = res.locals;

  const result = await wishlistService.removeFromWishlist(isString(id), productId);

  if (!result.ok) return next(new Error("No se pudo eliminar de la wishlist"));

  return res.status(200).json({
    ok: true,
    data: result.content,
  });
};
