import prisma from "../config/prismaClient.js";

export const createProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price || price < 0) {
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

export const updateProduct = (req, res, next) => {
  const { name, description, price, stock, imageUrl } = req.body; // Obtenemos todos los elementos del body pasados por el usuario

  if (
    // Comprobamos que haya almenos algun elemento nuevo para actualizar el producto
    !name &&
    !description &&
    !price &&
    !stock &&
    !imageUrl
  ) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes completar algun campo para actualizar" },
    });
  }

  next();
};

export const createUser = (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el email y la contraseña" },
    });
  }

  next();
};

export const loginOneUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el email y la contraseña" },
    });
  }

  next();
};

export const updateUser = (req, res, next) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el rol" },
    });
  }

  next();
};

export const createReview = async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  if (!rating || !productId) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el rating y el productId" },
    });
  }

  // Comprobamos que el producto exista en la base de datos
  const id = Number(productId);
  const result = await prisma.product.findUnique({
    where: { id },
  });

  if (!result) {
    return res.status(404).json({
      ok: false,
      error: { message: "Producto no encontrado" },
    });
  }

  next();
};

export const updateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  if (!rating && !comment) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el rating o el comentario para actualizar" },
    });
  }

  next();
};

export const addItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({
      ok: false,
      error: { message: "Debes ingresar el Id del producto y la cantidad para añadirlo al carrito" },
    });
  }

  next();
};
