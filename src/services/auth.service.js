import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js";

export const registerUser = async ({ email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña y la guardamos

  return await prisma.user.create({
    data: { email, password: hashedPassword, role }, // Creamos el usuario en la db con su mail, role y contraseña hasheada
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } }); // Buscamos el usuario por su email
  if (!user) throw new Error("El email o la contraseña no son válidos");

  const isValid = await bcrypt.compare(password, user.password); // Comparamos su contraseña
  if (!isValid) throw new Error("El email o la contraseña no son válidos");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Si es valida generamos el token

  return token;
};
