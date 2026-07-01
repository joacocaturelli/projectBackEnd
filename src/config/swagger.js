import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API e-commerce",
      version: "1.0.0",
      description:
        "API REST para un e-commerce. Autenticación mediante cookie HTTP-only (JWT). " +
        "Los endpoints protegidos requieren haber hecho login previamente. " +
        "Los endpoints marcados como ADMIN requieren role='ADMIN' en el token.",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },

      schemas: {
        // =====================
        // USER
        // =====================
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", example: "test@mail.com" },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // =====================
        // USER PROFILE
        // =====================
        UserProfile: {
          type: "object",
          properties: {
            email: { type: "string", example: "test@mail.com" },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
          },
        },

        // =====================
        // PRODUCT
        // =====================
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "iPhone 15" },
            description: { type: "string", nullable: true },
            price: { type: "number", example: 999.99 },
            stock: { type: "integer", example: 10 },
            imageUrl: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // =====================
        // CART ITEM
        // =====================
        CartItem: {
          type: "object",
          properties: {
            id: { type: "string" },
            cartId: { type: "string" },
            productId: { type: "string", example: "2" },
            quantity: { type: "integer", example: 1 },
          },
        },

        // =====================
        // CART
        // =====================
        Cart: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            status: {
              type: "string",
              enum: ["ACTIVE", "CHECKED_OUT"],
            },
            createdAt: { type: "string", format: "date-time" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
          },
        },

        // =====================
        // REVIEW
        // =====================
        Review: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string" },
            userId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        ReviewByUser: {
          type: "object",
          properties: {
            productId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
        },

        ReviewByProduct: {
          type: "object",
          properties: {
            userId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
        },

        // =====================
        // WISHLIST
        // =====================
        WishlistDocument: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            productId: { type: "string" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // =====================
        // ORDER
        // =====================
        Order: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            total: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // =====================
        // INPUTS - AUTH
        // =====================
        AuthCredentials: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "admin@test.com" },
            password: { type: "string", example: "123456" },
          },
        },

        AuthRegister: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "test@mail.com" },
            password: { type: "string", example: "123456" },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
          },
        },

        // =====================
        // INPUTS — PRODUCT
        // =====================
        CreateProduct: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string", example: "iPhone 15" },
            description: { type: "string" },
            price: { type: "number", example: 999.99 },
            stock: { type: "integer", example: 10 },
            imageUrl: { type: "string" },
          },
        },

        UpdateProduct: {
          type: "object",
          description: "Al menos uno de los campos es obligatorio. " + "Si se envían price o stock, deben ser números.",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            imageUrl: { type: "string" },
          },
        },

        // =====================
        // INPUTS — CART
        // =====================
        AddCartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string", example: "3" },
            quantity: { type: "integer", example: 2 },
          },
        },

        // =====================
        // INPUTS — REVIEW
        // =====================
        ReviewCreate: {
          type: "object",
          required: ["productId", "rating"],
          properties: {
            productId: { type: "string", example: "1" },
            rating: { type: "integer", minimum: 1, maximum: 5, example: 4 },
            comment: { type: "string", example: "Muy buen producto" },
          },
        },

        ReviewCreateByProduct: {
          type: "object",
          required: ["rating"],
          properties: {
            rating: { type: "integer", minimum: 1, maximum: 5, example: 4 },
            comment: { type: "string", example: "Muy buen producto" },
          },
        },

        ReviewPut: {
          type: "object",
          description:
            "Al menos uno de los dos campos es obligatorio. " + "Si se envía rating, debe ser un número entre 1 y 5.",
          properties: {
            rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
            comment: { type: "string", example: "Actualizado: excelente" },
          },
        },

        // =====================
        // INPUTS — USER
        // =====================
        UserPut: {
          type: "object",
          required: ["role"],
          properties: {
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
          },
        },
      },

      // =====================
      // SHARED RESPONSES
      // =====================
      responses: {
        // 400 - BAD_INPUT
        BadInputError: {
          description: "Datos de entrada incorrectos (BAD_INPUT)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "incorrect input data" },
            },
          },
        },

        // 400 - MISSING_INPUT
        MissingInputError: {
          description: "Faltan datos obligatorios en el body (MISSING_INPUT)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "missing input data" },
            },
          },
        },

        // 400 - WRONG_CRED
        WrongCredentialsError: {
          description: "Email o contraseña incorrectos (WRONG_CRED)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "incorrect credentials" },
            },
          },
        },

        // 401 - NO_TOKEN
        NoTokenError: {
          description: "Sin sesión activa o token inválido/expirado (NO_TOKEN)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "invalid token or expired" },
            },
          },
        },

        // 403 - UNAUTHORIZED
        UnauthorizedError: {
          description: "El usuario no tiene el rol requerido (UNAUTHORIZED)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "unauthorized" },
            },
          },
        },

        // 404 - NOT_FOUND
        NotFoundError: {
          description: "Recurso no encontrado (NOT_FOUND)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "resource not found" },
            },
          },
        },

        // 500 - BAD_ERROR
        ServerError: {
          description: "Error interno del servidor (BAD_ERROR)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { ok: false, error: "something went wrong" },
            },
          },
        },
      },
    },

    security: [{ cookieAuth: [] }],
  },

  apis: ["./src/routes/*.js"],
});
