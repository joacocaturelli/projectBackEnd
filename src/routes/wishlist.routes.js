import express from "express";
import * as wishListController from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/wishlist:
 *   get:
 *     summary: Obtener la wishlist del usuario autenticado
 *     description: >
 *       Devuelve los productos completos de la wishlist del usuario.
 *       El service obtiene los productIds guardados en Mongo y luego llama
 *       a getProducts() en Prisma, por lo que la respuesta son objetos Product
 *       completos, no los documentos de wishlist.
 *     tags:
 *       - Wishlist
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Wishlist obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.get("/", authMiddleware, wishListController.getWishlistByUser);

/**
 * @openapi
 * /api/wishlist/add/{productId}:
 *   post:
 *     summary: Añadir un producto a la wishlist
 *     description: >
 *       Verifica que el producto exista en Prisma y crea el documento en Mongo.
 *       Un usuario no puede tener el mismo producto dos veces en la wishlist
 *       Devuelve el documento Mongo creado (WishlistDocument) y el producto.
 *     tags:
 *       - Wishlist
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: Producto añadido a la wishlist correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/WishlistDocument"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 *       409:
 *         $ref: "#/components/responses/ConflictError"
 */
router.post("/add/:productId", authMiddleware, wishListController.addToWishlist);

/**
 * @openapi
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Eliminar un producto de la wishlist
 *     description: >
 *       Elimina el documento de wishlist del usuario sobre el producto indicado.
 *       Devuelve el documento Mongo eliminado (WishlistDocument).
 *     tags:
 *       - Wishlist
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado de la wishlist. Devuelve el documento eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/WishlistDocument"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.delete("/:productId", authMiddleware, wishListController.removeFromWishlist);

export default router;
