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
  const id = req.params.id;

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

  // Comprobamos que price y stock sean validos
  const priceResult = needNumber(price);
  if (!priceResult.ok) return next(Selector.BAD_INPUT);

  let validateStock;
  if (stock !== undefined) {
    const stockResult = needNumber(stock, { integer: true });

    if (!stockResult.ok) return next(Selector.BAD_INPUT);
    validateStock = stockResult.content;
  }

  const result = await productsService.createProduct(
    {
      name,
      description,
      price: priceResult.content,
      stock: validateStock,
    },
    req.file, // si hay un archivo para la imagen lo pasa, si no es undefined
  );

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.status(201).json({
    ok: true,
    data: result.content,
  });
};

export const updateOneProduct = async (req, res, next) => {
  // Funcion para actualizar un producto
  const id = req.params.id;

  // Obtenemos todos los elementos del body pasados por el usuario
  const { name, description, price, stock } = req.body;

  let validatePrice;
  if (price !== undefined) {
    const priceResult = needNumber(price);

    if (!priceResult.ok) return next(Selector.BAD_INPUT);

    validatePrice = priceResult.content;
  }

  let validateStock;
  if (stock !== undefined) {
    const stockResult = needNumber(stock, { integer: true });

    if (!stockResult.ok) return next(Selector.BAD_INPUT);

    validateStock = stockResult.content;
  }

  // Creamos un objeto dinamico en el que si un campo es undefinded
  // directamente no lo enviamos al service. Esto sirve para que si
  // actualizamos el producto y solamente enviamos un archivo de imagen
  // el form-data no nos actualice los campos a ""
  const updateData = {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price: validatePrice }),
    ...(stock !== undefined && { stock: validateStock }),
  };

  const result = await productsService.updateProduct(
    // Actualizamos el producto
    id,
    updateData,
    req.file,
  );

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const deleteOneProduct = async (req, res, next) => {
  // Funcion para eliminar un producto del array

  const id = req.params.id;

  const result = await productsService.deleteProduct(id);

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};
