import express from "express";
import * as reviewController from "../controllers/review.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as validate from "../middlewares/validate.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     summary: Obtener reviews del usuario autenticado
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
 */
router.get("/", authMiddleware, reviewController.getReviewByUser);

/**
 * @openapi
 * /api/reviews:
 *   post:
 *     summary: Crear review
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewCreate"
 *     responses:
 *       201:
 *         description: Review creada
 */
router.post("/", authMiddleware, validate.obligatory(["rating", "productId"]), reviewController.createReview);

/**
 * @openapi
 * /api/reviews/{productId}:
 *   put:
 *     summary: Actualizar review de un producto
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewPut"
 *     responses:
 *       200:
 *         description: Review actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 */
router.put("/:productId", authMiddleware, validate.necessaryOne(["rating", "comment"]), reviewController.updateReview);

/**
 * @openapi
 * /api/reviews/{productId}:
 *   delete:
 *     summary: Eliminar review
 *     tags:
 *       - Reviews
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
 *         description: Review eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review deleted
 */
router.delete("/:productId", authMiddleware, reviewController.deleteReview);

export default router;
