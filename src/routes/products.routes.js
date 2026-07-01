import express from "express";
import * as productsController from "../controllers/products.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requireRole.middleware.js";
import { getReviewByProduct, createReviewByProduct } from "../controllers/review.controllers.js";
import upload from "../config/multer.js";

const router = express.Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Products
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
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
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/", authMiddleware, productsController.getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags:
 *       - Products
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/:id", authMiddleware, productsController.getProduct);

/**
 * @openapi
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Obtener reviews de un producto
 *     description: >
 *       Devuelve las reviews del producto indicado.
 *     tags:
 *       - Reviews
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
 *         description: Reviews del producto obtenidas correctamente
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
 *                     $ref: "#/components/schemas/ReviewByProduct"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/:productId/reviews", authMiddleware, getReviewByProduct);

/**
 * @openapi
 * /api/products/{productId}/reviews:
 *   post:
 *     summary: Crear una review para un producto
 *     description: >
 *       Crea una review asociando el usuario autenticado con el producto.
 *       Un usuario solo puede tener una review por producto
 *       El campo `rating` debe ser un número entero entre 1 y 5.
 *     tags:
 *       - Reviews
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewCreateByProduct"
 *     responses:
 *       201:
 *         description: Review creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Review"
 *       400:
 *         $ref: "#/components/responses/BadInputError"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post("/:productId/reviews", authMiddleware, createReviewByProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Crear un producto (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Si el rol es USER, devuelve 401 "unauthorized"
 *       Los campos `price` y `stock` deben ser números válidos.
 *       Para subir imagen usa el endpoint POST /api/products/image.
 *     tags:
 *       - Products
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateProduct"
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         $ref: "#/components/responses/BadInputError"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post(
  "/",
  authMiddleware,
  requiredRole,
  validate.obligatory(["name", "price"]),
  productsController.createOneProduct,
);

/**
 * @openapi
 * /api/products/image:
 *   post:
 *     summary: Crear un producto con imagen adjunta (solo ADMIN)
 *     description: >
 *       Variante de POST /api/products que acepta multipart/form-data
 *       para subir una imagen. La imagen se sube a Cloudinary y el campo
 *       imageUrl se establece automáticamente con la URL resultante.
 *     tags:
 *       - Products
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen a subir
 *     responses:
 *       201:
 *         description: Producto creado con imagen correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         $ref: "#/components/responses/BadInputError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.post(
  "/image",
  authMiddleware,
  requiredRole,
  validate.obligatory(["name", "price"]),
  upload.single("imageUrl"),
  productsController.createOneProduct,
);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Al menos uno de los campos del body es obligatorio.
 *       Si se envían `price` o `stock`, deben ser números válidos.
 *     tags:
 *       - Products
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateProduct"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         $ref: "#/components/responses/BadInputError"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.put(
  "/:id",
  authMiddleware,
  requiredRole,
  validate.necessaryOne(["name", "description", "price", "stock", "imageUrl"]),
  productsController.updateOneProduct,
);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Devuelve el objeto Product completo que fue eliminado.
 *     tags:
 *       - Products
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado. Devuelve el objeto eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 *       500:
 *         $ref: "#/components/responses/ServerError"
 */
router.delete("/:id", authMiddleware, requiredRole, productsController.deleteOneProduct);

export default router;
