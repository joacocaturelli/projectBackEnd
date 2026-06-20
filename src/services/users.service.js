import prisma from "../config/prismaClient.js";

export const getMe = async ({ email, role }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, role: true },
    });

    return {
      ok: true,
      content: user,
    };
  } catch (error) {
    console.log("Error al obtener perfil:", error.message);
    return {
      ok: false,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });

    return {
      ok: true,
      content: users,
    };
  } catch (error) {
    console.log("Error al obtener todos los usuarios:", error.message);
    return {
      ok: false,
    };
  }
};

export const getUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
      role: true,
    },
  });
};

export const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id },
    omit: { password: true },
    data,
  });
};

export const deleteUser = (id) => {
  return prisma.user.delete({
    where: { id },
    omit: { password: true },
  });
};
