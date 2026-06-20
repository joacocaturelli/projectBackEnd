// Requerimos que el usario tenga el rol ADMIN
export const requiredRole = (req, res, next) => {
  const { role } = res.locals;

  // Si no lo tiene, no le damos acceso a la ruta
  if (role !== "ADMIN") return next(new Error("Error: no autorizado"));

  // Si lo tiene imprimimos por consola su actividad
  const now = new Date().toISOString();

  console.log(`[${now}] ${req.method} ${req.url}`);

  next();
};
