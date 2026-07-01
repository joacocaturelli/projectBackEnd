import express from "express";
import * as serverControllers from "../controllers/server.controller.js";

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Estado del servidor
 *     description: >
 *       Endpoint público de comprobación básica. No requiere autenticación.
 *     tags:
 *       - Server
 *     security: []
 *     responses:
 *       200:
 *         description: El servidor está activo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: "API funcionando"
 */
router.get("/", serverControllers.serverLive);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check del sistema
 *     description: >
 *       Devuelve el tiempo de actividad del proceso Node.js y el timestamp actual.
 *       No requiere autenticación.
 *     tags:
 *       - Server
 *     security: []
 *     responses:
 *       200:
 *         description: El servidor está saludable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       description: Segundos que lleva activo el proceso Node.js
 *                       example: 3600.45
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora actual en ISO 8601
 *                       example: "2025-06-01T12:00:00.000Z"
 */
router.get("/health", serverControllers.serverHealth);

export default router;
