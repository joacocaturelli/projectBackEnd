import prisma from "../config/prismaClient.js";

export const getOrderById = async (orderId, userId) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new Error("Orden no encontrada");

    if (order.userId !== userId) {
      throw new Error("No tienes permiso para ver esta orden");
    }

    return {
      ok: true,
      content: order,
    };
  } catch (error) {
    console.log("Error getting order:", error.message);
    return {
      ok: false,
    };
  }
};

export const getUserOrders = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" }, // Mas recientes primero
    });

    return {
      ok: true,
      content: orders,
    };
  } catch (error) {
    console.log("Error getting user orders:", error.message);
    return {
      ok: false,
    };
  }
};
