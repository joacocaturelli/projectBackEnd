import prisma from "../config/prismaClient";

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

  let total = 0;

  // Obtenemos el precio total del carrito
  for (const item of cart.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    total += product.price * item.quantity;
  }

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
