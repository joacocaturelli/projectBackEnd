export const requiredRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        ok: false,
        error: { message: "Acceso no autorizado" },
      });
    }
    next();
  };
};
