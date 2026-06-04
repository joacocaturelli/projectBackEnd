// Se va a registrar despues de todas las rutas
// Captura cualquier peticion a una URL inexistente

export const notFound = (req, res) => {
  res.status(404).json({
    ok: false,
    error: { message: `Ruta no encontrada ${req.method} ${req.url}` },
  });
};
