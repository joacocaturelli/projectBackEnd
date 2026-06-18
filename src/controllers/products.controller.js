import * as productsService from "../services/products.service.js"; // Importamos el objeto con las funciones de services

export const getProducts = async (req, res, next) => {
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

export const getProduct = async (req, res, next) => {
  // Funcion para obtener un solo producto pasando un Id
  try {
    const product = await productsService.getProductById(parseInt(req.params.id));

    return res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createOneProduct = async (req, res, next) => {
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

export const updateOneProduct = async (req, res, next) => {
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

export const deleteOneProduct = async (req, res, next) => {
  // Funcion para eliminar un producto del array
  try {
    const productToDelete = await productsService.deleteProduct(parseInt(req.params.id));

    return res.status(200).json({
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
