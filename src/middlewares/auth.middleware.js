import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verificamos y decodificamos el token

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: { message: "No autenticado" },
      });
    }

    const { id, email, role } = user;
    res.locals.email = email;
    res.locals.role = role;
    res.locals.id = id;

    next();
  } catch (error) {
    res.clearCookie("token");

    return res.status(401).json({
      ok: false,
      error: { message: "Token invalido o expirado" },
    });
  }
};
