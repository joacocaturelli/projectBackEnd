import rateLimit from "express-rate-limit";
import prisma from "../config/prismaClient.js";
import { env } from "../config/env.js";

export const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  maxAge: 3_600_000, // 1 hora
};

// Limitamos las peticiones a 100 por minuto
export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    ok: false,
    error: "Demasiadas peticiones, intentalo de nuevo en 1 minuto",
  },
});

// Para auth el limite es de 10 intentos cada 15min
export const authLimiter = rateLimit({
  windowMs: 60 * 1000 * 15,
  max: 10,
  message: {
    ok: false,
    error: "Demasiadas peticiones, intentalo de nuevo en 15 minutos",
  },
});

export const needNumber = (value, { integer = false } = {}) => {
  if (value === undefined || value === null || value === "") {
    console.log("needNumber");
    return { ok: false };
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    console.log("needNumber");
    return { ok: false };
  }

  if (number < 0) {
    console.log("needNumber");
    return { ok: false };
  }

  if (integer && !Number.isInteger(number)) {
    console.log("needNumber");
    return { ok: false };
  }

  return { ok: true, content: number };
};
