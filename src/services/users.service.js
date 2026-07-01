import prisma from "../config/prismaClient.js";

export const getProfile = async ({ email }) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
      select: { email: true, role: true },
    });

    if (!result) throw new Error("No se pudo obtener el usuario desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting profile:", error.message);
    return {
      ok: false,
    };
  }
};

export const getUsers = async () => {
  try {
    const result = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });

    if (!result) throw new Error("No se pudieron obtener los usuarios desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error al obtener todos los usuarios:", error.message);
    return {
      ok: false,
    };
  }
};

export const getUserById = async (id) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!result) throw new Error("No se pudo obtener el usuario desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error geting user by Id:", error.message);
    return {
      ok: false,
    };
  }
};

export const updateUser = async (id, data) => {
  try {
    const result = await prisma.user.update({
      where: { id },
      omit: { password: true },
      data,
    });

    if (!result) throw new Error("No se pudo actualizar el usuario desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Error updating user:", error.message);

      return {
        ok: false,
        error: "User not found",
      };
    }

    console.log("Error updating user:", error.message);
    return {
      ok: false,
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await prisma.user.delete({
      where: { id },
      omit: { password: true },
    });

    if (!result) throw new Error("No se pudo eliminar el usuario desde prisma");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    if (error.code === "P2025") {
      console.log("Error deleting user:", error.message);

      return {
        ok: false,
        error: "User not found",
      };
    }

    console.log("Error deleting user:", error.message);
    return {
      ok: false,
    };
  }
};
