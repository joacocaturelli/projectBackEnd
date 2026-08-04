import prisma from "../config/prismaClient.js";
import { uploadImage } from "./cloudinary.service.js";

export const getProducts = async (productsIds) => {
  try {
    // Si productsIds existe (enviados desde wishlist.service) devuelve solo los productos
    // en la wishlist. Si productsIds no existe, trae todos los productos para el catalogo
    const result = await prisma.product.findMany(productsIds ? { where: { id: { in: productsIds } } } : {});

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting products", error.message);
    return {
      ok: false,
    };
  }
};

export const getProductById = async (id) => {
  try {
    const result = await prisma.product.findUnique({
      where: { id },
    });

    if (!result) throw new Error("Producto no obtenido desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting product by Id", error.message);
    return {
      ok: false,
    };
  }
};

export const createProduct = async (data, file) => {
  try {
    let imageUrl = data.imageUrl;

    if (file) {
      const imageResult = await uploadImage(file);

      if (!imageResult.ok) {
        throw new Error("Image upload failed");
      }

      imageUrl = imageResult.content.secure_url;
    }

    const result = await prisma.product.create({
      data: {
        ...data,
        imageUrl,
      },
    });

    if (!result) throw new Error("Producto no creado desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error creating product", error.message);
    return {
      ok: false,
    };
  }
};

export const updateProduct = async (id, data, file) => {
  try {
    let imageUrl = data.imageUrl;

    if (file) {
      const imageResult = await uploadImage(file);

      if (!imageResult.ok) {
        throw new Error("Image upload failed");
      }

      imageUrl = imageResult.content.secure_url;
    }

    const result = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(imageUrl && { imageUrl }),
      },
    });

    if (!result) throw new Error("Producto no actualizado desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Error updating product", error.message);

      return {
        ok: false,
        error: "Product not found",
      };
    }

    console.log("Error updating product", error.message);
    return {
      ok: false,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const result = await prisma.product.delete({
      where: { id },
    });

    if (!result) throw new Error("Producto no eliminado desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Error deleting product", error.message);

      return {
        ok: false,
        error: "Product not found",
      };
    }

    console.log("Error deleting product", error.message);
    return {
      ok: false,
    };
  }
};
