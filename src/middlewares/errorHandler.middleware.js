import CustomError from "../utils/errors.utils.js";

export default (error, req, res, next) => {
  if (!(error instanceof CustomError)) return next(new CustomError(error));
  return next(error);
};
