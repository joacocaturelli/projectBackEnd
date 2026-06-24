import express from "express"; //Importamos express
import * as serverControllers from "../controllers/server.controller.js"; // Importamos los controladores

const router = express.Router(); //Creamos el router con la propiedad Router() de express

/**
 * @openapi
 * /:
 *   get:
 *     summary: Estado del servidor
 *     tags:
 *       - Server
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", serverControllers.serverLive);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check del sistema
 *     tags:
 *       - Server
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/health", serverControllers.serverHealth);

export default router;
