export const Selector = {
  BAD_INPUT: "badInput",
  MISSING_INPUT: "missingInput",
  WRONG_CRED: "wrongCredentials",
  NO_TOKEN: "noToken",
  UNAUTHORIZED: "unauthorized",
  NOT_FOUND: "notFound",
  BAD_ERROR: "badError",
};

// Catalogo de errores
const errors = {
  [Selector.BAD_INPUT]: {
    statusCode: 400,
    message: "incorrect input data",
  },
  [Selector.MISSING_INPUT]: {
    statusCode: 400,
    message: "missing input data",
  },
  [Selector.WRONG_CRED]: {
    statusCode: 401,
    message: "incorrect credentials",
  },
  [Selector.NO_TOKEN]: {
    statusCode: 401,
    message: "invalid token or expired",
  },
  [Selector.UNAUTHORIZED]: {
    statusCode: 401,
    message: "unauthorized",
  },
  [Selector.NOT_FOUND]: {
    statusCode: 404,
    message: "resource not found",
  },
  [Selector.BAD_ERROR]: {
    statusCode: 500,
    message: "something went wrong",
  },
};

export default class CustomError extends Error {
  constructor(errorType) {
    super(""); // Invocar al constructor de la clase padre(Error)

    // Destructuring de variables obtenidas del errorType en el catalogo
    const { statusCode, message } = this._getError(errorType);
    this.statusCode = statusCode;
    this.message = message;
  }

  // Las variables que empiezan con _ solo deberian poder ser accesibles
  // a traves de los miembros de la misma clase

  // Busca dentro del catalogo el valor asociado al errorType
  // Si no hay ninguno, por defecto sera BAD_ERROR(500)
  _getError(errorType) {
    return errors[errorType] ?? errors[Selector.BAD_ERROR];
  }
}
