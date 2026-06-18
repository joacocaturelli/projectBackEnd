export const serverLive = async (req, res, next) => {
  // Funcion para comprobar que la API funciona
  try {
    return await res.json({
      ok: true,
      data: "API funcionando",
    });
  } catch (error) {
    next(error);
  }
};

export const serverHealth = async (req, res, next) => {
  // Funcion Health para chequear que el servidor esta vivo
  try {
    return await res.status(200).json({
      ok: true,
      data: {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
