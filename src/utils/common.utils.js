import rateLimit from "express-rate-limit";
import prisma from "../config/prismaClient.js";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 3_600_000, // 1 hora
};

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    ok: false,
    error: { message: "Demasiadas peticiones, intentalo en 1 minuto" },
  },
});

export const isString = (value) => {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
};

export const isNumber = (value) => {
  if (typeof value === "number") return value;
  return Number(value);
};

export const needNumber = (value) => {
  const number = isNumber(value);

  if (Number.isNaN(number)) return { ok: false };

  return { ok: true, content: number };
};
