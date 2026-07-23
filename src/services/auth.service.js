import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js";
import { isString } from "../utils/common.utils.js";

// Registrar un nuevo usuario
export const registerUser = async ({ password, email, name }) => {
  try {
    // Hasheamos la contraseña y la guardamos
    const hashedPassword = await bcrypt.hash(isString(password), 10);

    // Creamos el usuario en la db con su mail, role y contraseña hasheada
    const result = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    if (!result) throw new Error("Prisma no pudo crear el usuario");

    return {
      ok: true,
      content: "User registered",
    };
  } catch (error) {
    console.log("Error registering user", error.message);
    return {
      ok: false,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      select: { id: true, password: true, role: true, name: true },
      where: { email }, // Buscamos el usuario por su email
    });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(isString(password), user.password); // Comparamos su contraseña

    if (!isValid) throw new Error("Incorrect email or password");

    const token = jwt.sign(
      {
        id: user.id,
        email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    ); // Si es valida generamos el token

    const userData = {
      email,
      role: user.role,
      name: user.name,
    };

    return {
      ok: true,
      content: {
        token: token,
        user: userData,
      },
    };
  } catch (error) {
    console.log("Error logging user", error.message);
    return {
      ok: false,
    };
  }
};
