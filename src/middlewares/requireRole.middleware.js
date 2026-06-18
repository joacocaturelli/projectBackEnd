export const requiredRole = (req, res, next) => {
  const { role } = res.locals;

  if (role !== "ADMIN") return next(new Error("Error: no autorizado"));

  next();
};
