import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      ok: false,
      data: { message: "No autenticado" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos y decodificamos el token

    req.user = decoded; // Guardamos el payload en req.user para que lo use el controlador

    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({ ok: false, error: { message: "Token invalido o expirado" } });
  }
};
