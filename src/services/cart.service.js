import prisma from "../config/prismaClient.js";
import { Prisma } from "@prisma/client";

// Obtenemos el carrito active del user y si no tiene se lo creamos
export const getCart = async (userId) => {
  try {
    let result = await prisma.cart.findUnique({
      where: { userId, status: "ACTIVE" },
      include: { items: { include: { product: true } } },
    });

    if (!result) {
      result = await prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    if (!result) throw new Error("No se pudo inicializar el carrito desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error getting cart:", error.message);
    return {
      ok: false,
    };
  }
};

// Obtener un carrito por Id
export const getCartById = async (cartId, userId) => {
  try {
    let result = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });

    if (!result) throw new Error("No se pudo obtener el carrito desde prisma");

    if (result.userId !== userId) throw new Error("No tienes permiso para acceder a ese carrito");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error getting cart:", error.message);
    return {
      ok: false,
    };
  }
};

// Añadir un producto al carrito
export const addItem = async (userId, productId, quantity = 1) => {
  try {
    // Comprobar que el producto exista en la base de datos
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error("Producto no encontrado");

    // Extraemos los datos del carrito y lo guardamos como cart
    const cartResult = await getCart(userId);

    if (!cartResult.ok) throw new Error("No se pudo obtener el carrito");

    const cart = cartResult.content;

    // Comprobar si existe el producto en el carrito
    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId: cart.id, productId },
    });

    // Corroboramos antes de añadir el producto al carrito que la
    // suma total (con lo que ya tenia previamente en el carrito)
    // no sea mayor al stock
    const finalQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (product.stock < finalQuantity) {
      return {
        ok: false,
        error: "insufficient stock",
      };
    }

    // Si existe el producto en el carrito y la cantidad
    // es correcta se la añadimos al producto
    if (existingItem) {
      return {
        ok: true,
        content: await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: finalQuantity },
        }),
      };
    }

    // Si no existe creamos el producto en el carrito
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

export const removeItem = async (userId, productId) => {
  try {
    const { content: cart } = await getCart(userId);

    const result = await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!result) throw new Error("CartItem no eliminado del carrito desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Error deleting cart item from cart", error.message);

      return {
        ok: false,
        error: "Cart item not found",
      };
    }

    console.log("Error deleting cart item", error.message);
    return {
      ok: false,
    };
  }
};

// Hacemos el checkout del carrito
export const checkOut = async (userId) => {
  try {
    let order; // Declaramos la variable

    // Creamos la orden usando $transaction para que si
    // una de las peticiones a la DB falla o si lanzamos
    // una excepcion, se haga un rollback
    // cancelando todas las peticiones
    await prisma.$transaction(async (tx) => {
      // Buscamos el carrito activo
      const cart = await tx.cart.findUnique({
        where: {
          userId,
          status: "ACTIVE",
        },
        include: { items: true },
      });

      if (!cart) {
        throw new Error("No hay carrito activo");
      }

      if (cart.items.length === 0) {
        throw new Error("El carrito esta vacio");
      }

      // Obtenemos el precio total del carrito (Recomendado por chatGPT)
      // Obtenemos los ids de los productos
      const productIds = cart.items.map((item) => item.productId);

      // Buscamos esos productos con sus ids
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      });

      // Creamos un map de objetos de los productos
      // para acceder rapidamente al precio
      const productsMap = Object.fromEntries(products.map((product) => [product.id, product]));

      // Calculamos el total
      const total = cart.items.reduce((sum, item) => {
        const product = productsMap[item.productId];
        return sum.plus(product.price.times(item.quantity)); // La forma recomendada por Prisma para decimales
      }, new Prisma.Decimal(0));

      // Comprobamos el stock de todos los productos
      for (const item of cart.items) {
        const product = productsMap[item.productId];

        if (!product) throw new Error("Producto no encontrado");

        // Volvemos a checkear el stock por si otro usuario hizo una compra
        if (product.stock < item.quantity) {
          throw new Error("Stock insuficiente");
        }
      }

      // Creamos la orden
      order = await tx.order.create({
        data: {
          userId,
          total,
        },
      });

      for (const item of cart.items) {
        const product = productsMap[item.productId];

        // Guardamos el historial: que se compro, cuanto y a que precio
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          },
        });

        // Actualizamos el stock del producto
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: { decrement: item.quantity }, // Forma recomendada por Prisma para sumar/restar campos numericos
          },
        });
      }

      // Hacemos el checkout del carrito
      await tx.cart.update({
        where: { id: cart.id },
        data: { status: "CHECKED_OUT" },
      });
    });

    return {
      ok: true,
      content: await prisma.order.findUnique({
        where: { id: order.id },
        include: { items: { include: { product: true } } },
      }),
    };
  } catch (error) {
    console.log("Error doing checking out:", error.message);
    return {
      ok: false,
    };
  }
};
