import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js";
import { isString } from "../utils/common.utils.js";

export const registerUser = async ({ password, ...user }) => {
  try {
    const hashedPassword = await bcrypt.hash(isString(password), 10); // Hasheamos la contraseña y la guardamos

    await prisma.user.create({ data: { ...user, password: hashedPassword } }); // Creamos el usuario en la db con su mail, role y contraseña hasheada

    return {
      ok: true,
    };
  } catch (error) {
    console.log("Error registrando usuario", error.message);
    return {
      ok: false,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      select: { id: true, password: true, role: true },
      where: { email }, // Buscamos el usuario por su email
    });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(isString(password), user.password); // Comparamos su contraseña
    if (!isValid) throw new Error("El email o la contraseña no son válidos");

    const token = jwt.sign({ id: user.id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Si es valida generamos el token

    return {
      ok: true,
      content: token,
    };
  } catch (error) {
    console.log("Error al hacer el login", error.message);
    return {
      ok: false,
    };
  }
};
