import * as authService from "../services/auth.service.js";
import prisma from "../config/prismaClient.js";
import { cookieOptions } from "../utils/common.utils.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const result = await authService.registerUser({ email, password, role });

    if (!result.ok) return next(new Error("No se pudo registrar el usuario"));

    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({ email, password });
    if (!result.ok) return next(new Error("No se pudo iniciar sesión"));

    res.cookie("token", result.content, cookieOptions);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: { message: "Invalid credentials" },
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.json({
    ok: true,
    data: "Sesion cerrada",
  });
};
