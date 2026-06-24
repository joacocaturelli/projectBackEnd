import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API e-commerce",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
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
            id: { type: "string" },
            productId: { type: "string" },
            userId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // =====================
        // WISHLIST
        // =====================
        WishlistItem: {
          type: "object",
          properties: {
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
        // AUTH INPUTS
        // =====================
        AuthCredentials: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "test@mail.com" },
            password: { type: "string", example: "123456" },
          },
        },

        CreateProduct: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            imageUrl: { type: "string" },
          },
        },

        AddCartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string" },
            quantity: { type: "integer" },
          },
        },

        ReviewCreate: {
          type: "object",
          required: ["productId", "rating"],
          properties: {
            productId: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
        },

        ReviewPut: {
          type: "object",
          required: ["productId", "rating"],
          properties: {
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
        },

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

      responses: {
        UnauthorizedError: {
          description: "No autenticado",
        },
        ForbiddenError: {
          description: "No autorizado (rol insuficiente)",
        },
        NotFoundError: {
          description: "Recurso no encontrado",
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/routes/*.js"],
});
