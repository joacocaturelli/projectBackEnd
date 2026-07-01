import prisma from "../config/prismaClient.js";

// Obtenemos el carrito active del user y si no tiene se lo creamos
export const getCart = async (userId) => {
  try {
    let result = await prisma.cart.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { items: true },
    });

    if (!result) {
      result = await prisma.cart.create({
        data: { userId },
        include: { items: true, userId: false, createdAt: false },
      });
    }

    if (!result) throw new Error("No se pudo inicializar el carrito desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting cart:", error.message);
    return {
      ok: false,
    };
  }
};

// Obtener un carrito por Id
export const getCartById = async (cartId) => {
  try {
    let result = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!result) throw new Error("No se pudo obtener el carrito desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting cart:", error.message);
    return {
      ok: false,
    };
  }
};

// Añadir un producto al carrito
export const addItem = async (userId, productId, quantity) => {
  try {
    // Comprobar que el producto exista en la base de datos
    const id = Number(productId);
    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) throw new Error("Producto no encontrado");

    const { content: cart } = await getCart(userId);

    // Comprobar si existe el producto en el carrito
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    // Si existe le añadimos la cantidad de quantity
    if (existingItem) {
      return {
        ok: true,
        content: await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        }),
      };
    }

    // Si no existe lo creamos
    return {
      ok: true,
      content: await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      }),
    };
  } catch (error) {
    console.log("Error adding item to cart:", error.message);
    return {
      ok: false,
    };
  }
};

// Hacemos el checkout del carrito
export const checkOut = async (userId) => {
  try {
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

    const productsPrice = Object.fromEntries(products.map((product) => [product.id, product.price]));

    const total = cart.items.reduce((sum, item) => sum + productsPrice[Number(item.productId)] * item.quantity, 0);

    // Creamos la orden
    const order = await prisma.order.create({
      data: { userId, total },
    });

    if (!order) throw new Error("No se pudo crear la orden con prisma");

    // Hacemos el checkout
    await prisma.cart.update({
      where: { id: cart.id },
      data: { status: "CHECKED_OUT" },
    });

    return {
      ok: true,
      content: order,
    };
  } catch (error) {
    console.log("Error doing cheking out:", error.message);
    return {
      ok: false,
    };
  }
};
