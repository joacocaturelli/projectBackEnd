import prisma from "../config/prismaClient.js";

// Obtenemos el carrito active del user y si no tiene se lo creamos
export const getCart = async (userId) => {
  let cart = await prisma.cart.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }

  return cart;
};

// Obtener un carrito por Id
export const getCartById = async (cartId) => {
  let cart = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  return cart;
};

// Añadir un producto al carrito
export const addItem = async (userId, productId, quantity) => {
  const cart = await getCart(userId);

  // Comprobar si existe el producto en el carrito
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  // Si existe le añadimos la cantidad de quantity
  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  }

  // Si no existe lo creamos
  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
  });
};

// Hacemos el checkout del carrito
export const checkOut = async (userId) => {
  const cart = await prisma.cart.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { items: true },
  });

  if (!cart) {
    throw new Error("No hay carrito activo");
  }

  if (cart.items.length === 0) {
    throw new Error("El carrito esta vacio");
  }

  // Obtenemos el precio total del carrito (Recomendado por chatGPT)
  const productIds = cart.items.map((item) => Number(item.productId));

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productsPrice = Object.fromEntries(products.map((p) => [p.id, p.price]));

  const total = cart.items.reduce((sum, item) => sum + productsPrice[Number(item.productId)] * item.quantity, 0);

  // Creamos la orden
  const order = await prisma.order.create({
    data: { userId, total },
  });

  // Hacemos el checkout
  await prisma.cart.update({
    where: { id: cart.id },
    data: { status: "CHECKED_OUT" },
  });

  return order;
};
