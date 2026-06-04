import * as authService from "../services/auth.service.js";
import prisma from "../config/prismaClient.js";

export const register = async (req, res) => {
  console.log("ENTRO REGISTER");
  const user = await authService.registerUser(req.body);
  console.log("DESPUES DE DB");
  res.status(201).json({ ok: true, data: user });
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 2 * 60 * 60 * 1000,
};

export const login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);

    res.cookie("token", token, cookieOptions);

    res.json({ ok: true, message: "El login se realizo con exito" });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: { message: "Invalid credentials" },
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    ok: true,
    message: "Sesion cerrada",
  });
};

export const getMe = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  res.json({ ok: true, data: user });
};
