// Se registra al final de app.js (despues de las rutas)
// Recibe errores propagados con next(error) desde cualquier controller

export const errorHandler = (error, req, res, next) => {
  console.error("Error: ", error.message);
  const status = error.status || 500;
  res.status(status).json({
    ok: false,
    error: { message: error.message || "Internal server error" },
  });
};
