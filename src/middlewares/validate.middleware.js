import prisma from "../config/prismaClient.js";
import { Selector } from "../utils/errors.utils.js";

export const obligatory = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      const value = req.body[field];

      if (value === undefined || value === null || value === "") {
        console.log("obligarory middleware");
        return next(Selector.BAD_INPUT);
      }
    }

    next();
  };
};

export const necessaryOne = (fields) => {
  return (req, res, next) => {
    let valids = [];
    let invalids = [];

    for (const field of fields) {
      const value = req.body[field];

      if (value !== undefined && value !== null && value !== "") {
        valids.push(value);
      } else {
        invalids.push(value);
      }
    }

    if (valids.length === 0) {
      console.log("necessaryOne middleware");
      return next(Selector.MISSING_INPUT);
    }

    if (invalids.length > 0) {
      for (const field of invalids) {
        if (field === null || field === "") {
          console.log("necessaryOne middleware");
          return next(Selector.BAD_INPUT);
        }
      }
    }

    next();
  };
};
