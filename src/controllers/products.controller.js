import { productsService } from "../services/products.service.js"; // Importamos el objeto con las funciones de services

const serverLive = async (req, res, next) => {
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

const serverHealth = async (req, res, next) => {
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

const getProducts = async (req, res, next) => {
  // Funcion para obtener todos los productos
  try {
    const products = await productsService.getAllProducts();

    return res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  // Funcion para obtener un solo producto pasando un Id
  try {
    const product = await productsService.getProductById(parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({
        ok: false,
        error: { message: "Producto no encontrado" },
      });
    }

    res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createOneProduct = async (req, res, next) => {
  // Funcion para crear un producto nuevo
  try {
    const { name, description, price, stock, imageUrl } = req.body; // Obtenemos todos los elementos del body pasados por el usuario

    const newProduct = await productsService.createProduct({
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    return res.status(201).json({
      ok: true,
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneProduct = async (req, res, next) => {
  try {
    // Funcion para actualizar un producto
    const { name, description, price, stock, imageUrl } = req.body; // Obtenemos todos los elementos del body pasados por el usuario

    const newProductUpdated = await productsService.updateProduct(parseInt(req.params.id), {
      // Actualizamos el producto
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    return res.status(200).json({
      ok: true,
      data: newProductUpdated,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        error: { message: "Producto no encontrado para actualizar" },
      });
    }

    next(error);
  }
};

const deleteOneProduct = async (req, res, next) => {
  // Funcion para eliminar un producto del array
  try {
    const productToDelete = await productsService.deleteProduct(parseInt(req.params.id));

    res.status(200).json({
      ok: true,
      data: productToDelete,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        error: { message: "Producto no encontrado para eliminar" },
      });
    }

    next(error);
  }
};

export const indexController = {
  // Exportamos los controladores para el Index como un solo objeto
  serverHealth,
  serverLive,
};

export const productsController = {
  // Exportamos los controladores para el router como un solo objeto
  getProducts,
  getProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
