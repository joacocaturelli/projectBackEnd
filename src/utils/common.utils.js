import rateLimit from "express-rate-limit";

export const cookieOptions = {
  httpOnly: true,
  secure: false, // true en produccion
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
