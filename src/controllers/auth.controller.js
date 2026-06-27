import * as authService from "../services/auth.service.js";
import prisma from "../config/prismaClient.js";
import { cookieOptions } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const registerUser = async (req, res, next) => {
  const { email, password, role } = req.body;

  const result = await authService.registerUser({ email, password, role });

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.status(201).json({
    ok: true,
    data: result.data,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await authService.loginUser({ email, password });

  if (!result.ok) return next(Selector.WRONG_CRED);

  res.cookie("token", result.content, cookieOptions);

  return res.json({
    ok: true,
    data: "Welcome",
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.json({
    ok: true,
    data: "Sesion cerrada",
  });
};
