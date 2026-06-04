// Se ejecuta antes del controller en la ruta POST /api/products
// Verifica que el body contenga los campos obligatorios

const createProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price < 0) {
    // Comprobamos que como minimo tenga nombre y precio igual o mayor a 0
    return res.status(400).json({
      ok: false,
      error: {
        message: "Producto no creado, el nombre y el precio son obligatorios",
      },
    });
  }

  next();
};

const updateProduct = (req, res, next) => {
  const { name, description, price, stock, imageUrl } = req.body; // Obtenemos todos los elementos del body pasados por el usuario

  if (
    // Comprobamos que haya almenos algun elemento nuevo para actualizar el producto
    name === undefined &&
    description === undefined &&
    price === undefined &&
    stock === undefined &&
    imageUrl === undefined
  ) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes enviar al menos un campo para actualizar" },
    });
  }

  next();
};

const createUser = (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el email y la contraseña" },
    });
  }

  next();
};

const loginOneUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el email y la contraseña" },
    });
  }

  next();
};

export const validate = {
  updateProduct,
  createProduct,
  createUser,
  loginOneUser,
};
