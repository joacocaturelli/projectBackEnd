import * as orderService from "../services/order.service.js";
import { Selector } from "../utils/errors.utils.js";

export const getOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  const { id: userId } = res.locals; // Usuario autenticado

  const result = await orderService.getOrderById(orderId, userId);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getUserOrders = async (req, res, next) => {
  const { id: userId } = res.locals;

  const result = await orderService.getUserOrders(userId);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};
