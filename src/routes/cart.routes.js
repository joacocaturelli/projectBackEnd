import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Obtener carrito del usuario autenticado
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 */
router.get("/", authMiddleware, cartController.getCart);

/**
 * @openapi
 * /api/cart/{cartId}:
 *   get:
 *     summary: Obtener carrito por ID
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 */
router.get("/:cartId", authMiddleware, cartController.getCartById);

/**
 * @openapi
 * /api/cart/items:
 *   post:
 *     summary: Añadir producto al carrito
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AddCartItem"
 *     responses:
 *       201:
 *         description: Item añadido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 */
router.post("/items", authMiddleware, validate.addItem, cartController.addItem);

/**
 * @openapi
 * /api/cart/checkout:
 *   post:
 *     summary: Finalizar compra del carrito
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout completado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.post("/checkout", authMiddleware, cartController.checkOut);

export default router;
