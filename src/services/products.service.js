import prisma from "../config/prismaClient.js";

export const getAllProducts = async (productsIds) => {
  try {
    return {
      ok: true,
      content: await prisma.product.findMany({
        omit: { createdAt: true },
        where: { id: { in: productsIds } },
      }),
    };
  } catch (error) {
    console.log("Error obteniendo todos los productos", error.message);
    return {
      ok: false,
      content: [],
    };
  }
};

export const getProductById = (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const createProduct = (data) => {
  return prisma.product.create({ data });
};

export const updateProduct = (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = (id) => {
  return prisma.product.delete({
    where: { id },
  });
};
