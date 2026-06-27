import jwt from "jsonwebtoken";
import { isString } from "../utils/common.utils.js";
import { Selector } from "../utils/errors.utils.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // Verificamos y decodificamos el token

    if (!user) return next(Selector.UNAUTHORIZED);

    const { id, email, role } = user;
    res.locals.email = email;
    res.locals.role = role;
    res.locals.id = isString(id);

    next();
  } catch (error) {
    res.clearCookie("token");

    return next(Selector.NO_TOKEN);
  }
};
