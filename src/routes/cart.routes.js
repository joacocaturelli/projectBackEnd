import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     description: >
 *       Devuelve el carrito ACTIVE del usuario. Si no existe, lo crea automáticamente.
 *       Incluye los items del carrito con productId y quantity.
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/", authMiddleware, cartController.getCart);

/**
 * @openapi
 * /api/cart/{cartId}:
 *   get:
 *     summary: Obtener un carrito por ID
 *     description: >
 *       Busca un carrito por su UUID. Devuelve 404 si no existe.
 *       No verifica que el carrito pertenezca al usuario autenticado.
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: UUID del carrito
 *         schema:
 *           type: string
 *           example: "clx123abc..."
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Cart"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/:cartId", authMiddleware, cartController.getCartById);

/**
 * @openapi
 * /api/cart/items:
 *   post:
 *     summary: Añadir o actualizar un producto en el carrito
 *     description: >
 *       Si el producto ya existe en el carrito, suma la quantity indicada a la existente.
 *       Si no existe, crea un nuevo CartItem.
 *       Devuelve el CartItem creado o actualizado (no el carrito completo).
 *       El campo quantity debe ser un número entero válido.
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AddCartItem"
 *     responses:
 *       201:
 *         description: Item añadido o actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/CartItem"
 *       400:
 *         $ref: "#/components/responses/BadInputError"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/items", authMiddleware, validate.obligatory(["productId", "quantity"]), cartController.addItem);

/**
 * @openapi
 * /api/cart/checkout:
 *   post:
 *     summary: Finalizar compra del carrito
 *     description: >
 *       Procesa el carrito ACTIVE del usuario: calcula el total,
 *       crea una Order en Prisma y marca el carrito como CHECKED_OUT.
 *       Devuelve la Order creada.
 *     tags:
 *       - Cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Checkout completado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/checkout", authMiddleware, cartController.checkOut);

export default router;
