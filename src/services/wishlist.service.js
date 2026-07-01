import prisma from "../config/prismaClient.js";
import { Wishlist } from "../models/wishlist.model.js";
import { getProducts } from "./products.service.js";

export const getWishlistByUser = async (userId) => {
  try {
    // Busca la wishlist por el id del usuario
    const result = await Wishlist.find({ userId }, { productId: true, _id: false });

    if (!result) throw new Error("No se pudo obtener la wishlist desde Mongo");

    // Trasnforma la respuesta en un array de numeros con los products id
    const { content } = await getProducts(result.map(({ productId }) => Number(productId)));

    return {
      ok: true,
      content,
    };
  } catch (error) {
    console.log("Error showing wishlist", error.message);
    return {
      ok: false,
    };
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("No se encontro el producto desde Prisma");

    const result = await Wishlist.create({ userId, productId });

    if (!result) throw new Error("No se pudo añadir a la wishlist desde Mongo");

    return {
      ok: true,
      content: {
        wishlistDocument: result,
        productAdded: product,
      },
    };
  } catch (error) {
    console.log("Error adding into wishlist", error.message);
    return {
      ok: false,
    };
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const id = Number(productId);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("No se encontro el producto desde Prisma");

    const result = await Wishlist.findOneAndDelete({ userId, productId });

    if (!result) throw new Error("No se pudo eliminar de la wishlist desde Mobgo");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error deleting into wishlist", error.message);
    return {
      ok: false,
    };
  }
};
