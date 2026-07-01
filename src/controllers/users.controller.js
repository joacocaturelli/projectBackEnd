import * as usersService from "../services/users.service.js";
import { Selector } from "../utils/errors.utils.js";

export const getProfile = async (req, res, next) => {
  const { email } = res.locals;

  const result = await usersService.getProfile({ email });

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getUsers = async (req, res, next) => {
  const result = await usersService.getUsers();

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  const result = await usersService.getUserById(id);

  if (!result.ok) return next(Selector.NOT_FOUND);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const updateUser = async (req, res, next) => {
  const { role } = req.body;
  const id = parseInt(req.params.id);

  const result = await usersService.updateUser(id, { role });

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: result.content,
  });
};

export const deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);

  const result = await usersService.deleteUser(id);

  if (result.error) return next(Selector.NOT_FOUND);

  if (!result.ok) return next(Selector.BAD_ERROR);

  return res.json({
    ok: true,
    data: {
      "User eliminado": result.content,
    },
  });
};
