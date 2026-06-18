import * as usersService from "../services/users.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const { email, role } = res.locals;

    const result = await usersService.getMe({ email, role });

    if (!result.ok) return next(new Error("No se pudo obtener obtener el usuario"));

    return res.status(200).json({
      ok: true,
      data: result.content,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await usersService.getAllUsers();

    if (!result.ok) return next(new Error("No se pudieron obtener obtener los usuarios"));

    return res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(parseInt(req.params.id));

    if (!user) return next(new Error("Usuario no encontrado"));

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await usersService.updateUser(parseInt(req.params.id), { role });

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        error: { message: "Usuario no encontrado para actualizar" },
      });
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(parseInt(req.params.id));

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        ok: false,
        error: { message: "Usuario no encontrado para eliminar" },
      });
    }
    next(error);
  }
};
