import prisma from "../config/prismaClient.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (productsIds) => {
  try {
    const result = await prisma.product.findMany({
      omit: { createdAt: true },
      where: { id: { in: productsIds } },
    });

    if (!result) throw new Error("Productos no obtenidos desde prisma");

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

export const createProduct = async (data) => {
  try {
    const result = await prisma.product.create({ data });

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

export const updateProduct = async (id, data) => {
  try {
    const result = await prisma.product.update({
      where: { id },
      data,
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

export const uploadImage = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
        if (error) return reject(error);

        resolve(result);
      });

      stream.end(file.buffer);
    });

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};
