import prisma from "../config/prismaClient.js";

const getAllProducts = () => {
  return prisma.product.findMany();
};

const getProductById = (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

const createProduct = (data) => {
  return prisma.product.create({ data });
};

const updateProduct = (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProduct = (id) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const productsService = {
  // Exportamos todas las funciones como un unico objeto
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
