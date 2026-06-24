import express from "express"; //Importamos express
import * as productsController from "../controllers/products.controller.js"; //Importamos los controladores
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requireRole.middleware.js";

const router = express.Router(); //Creamos el router con la propiedad Router() de express

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener lista de productos
 *     tags:
 *       - Products
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
 *                 $ref: "#/components/schemas/Product"
 */
router.get("/", authMiddleware, productsController.getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.get("/:id", authMiddleware, productsController.getProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Crear producto (ADMIN only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateProduct"
 *     responses:
 *       201:
 *         description: Producto creado
 *     x-roles:
 *       - ADMIN
 */
router.post("/", authMiddleware, requiredRole, validate.createProduct, productsController.createOneProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto (ADMIN only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateProduct"
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.put("/:id", authMiddleware, requiredRole, validate.updateProduct, productsController.updateOneProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto (ADMIN only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted
 */
router.delete("/:id", authMiddleware, requiredRole, productsController.deleteOneProduct);

export default router;
