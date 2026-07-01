import * as productsService from "../services/products.service.js"; // Importamos el objeto con las funciones de services
import { Selector } from "../utils/errors.utils.js";
import { needNumber } from "../utils/common.utils.js";

export const getProducts = async (req, res, next) => {
  // Funcion para obtener todos los productos
  const result = await productsService.getProducts();

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getProduct = async (req, res, next) => {
  // Funcion para obtener un solo producto pasando un Id
  const id = parseInt(req.params.id);

  const result = await productsService.getProductById(id);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const createOneProduct = async (req, res, next) => {
  // Funcion para crear un producto nuevo

  const { name, description, price, stock } = req.body;
  // Obtenemos todos los elementos del body pasados por el usuario

  let { imageUrl } = req.body;

  const priceResult = needNumber(price);
  if (!priceResult.ok) return next(Selector.BAD_INPUT);

  if (stock !== undefined) {
    const stockResult = needNumber(stock);
    if (!stockResult.ok) return next(Selector.BAD_INPUT);
  }

  if (req.file) {
    const imageResult = await productsService.uploadImage(req.file);

    imageUrl = imageResult.content.secure_url;
  }

  const result = await productsService.createProduct({
    name,
    description,
    price,
    stock,
    imageUrl,
  });

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const updateOneProduct = async (req, res, next) => {
  // Funcion para actualizar un producto

  const id = parseInt(req.params.id);
  const { name, description, price, stock, imageUrl } = req.body;
  // Obtenemos todos los elementos del body pasados por el usuario

  if (price !== undefined) {
    const priceResult = needNumber(price);
    if (!priceResult.ok) return next(Selector.BAD_INPUT);
  }

  if (stock !== undefined) {
    const stockResult = needNumber(stock);
    if (!stockResult.ok) return next(Selector.BAD_INPUT);
  }

  const result = await productsService.updateProduct(id, {
    // Actualizamos el producto
    name,
    description,
    price,
    stock,
    imageUrl,
  });

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const deleteOneProduct = async (req, res, next) => {
  // Funcion para eliminar un producto del array

  const id = parseInt(req.params.id);

  const result = await productsService.deleteProduct(id);

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};
