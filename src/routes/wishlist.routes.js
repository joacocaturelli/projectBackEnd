import express from "express";
import * as wishListController from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/wishlist:
 *   get:
 *     summary: Obtener wishlist del usuario
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/WishlistItem"
 */
router.get("/", authMiddleware, wishListController.getWishlistByUser);

/**
 * @openapi
 * /api/wishlist/add/{productId}:
 *   post:
 *     summary: Añadir producto a wishlist
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Producto añadido a la wishlist
 */
router.post("/add/:productId", authMiddleware, wishListController.addToWishlist);

/**
 * @openapi
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Eliminar producto de wishlist
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado de la wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist product deleted
 */
router.delete("/:productId", authMiddleware, wishListController.removeFromWishlist);

export default router;
