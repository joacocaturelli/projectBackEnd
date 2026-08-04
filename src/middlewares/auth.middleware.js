import jwt from "jsonwebtoken";
import { Selector } from "../utils/errors.utils.js";
import { env } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, env.JWT_SECRET);
    // Verificamos y decodificamos el token

    const { id, email, role, name } = user;
    res.locals.id = id;
    res.locals.email = email;
    res.locals.role = role;
    res.locals.name = name;

    next();
  } catch (error) {
    res.clearCookie("token");

    return next(Selector.NO_TOKEN);
  }
};
