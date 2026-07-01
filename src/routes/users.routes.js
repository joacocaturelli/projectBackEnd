import express from "express";
import * as userControllers from "../controllers/users.controller.js";
import * as validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requiredRole } from "../middlewares/requireRole.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: >
 *       Devuelve únicamente `email` y `role` del usuario autenticado
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/UserProfile"
 *       401:
 *         $ref: "#/components/responses/NoTokenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/profile", authMiddleware, userControllers.getProfile);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Devuelve todos los usuarios sin el campo `password`
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
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
 *                     $ref: "#/components/schemas/User"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/", authMiddleware, requiredRole, userControllers.getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Devuelve el usuario sin el campo `password`
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/UserProfile"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.get("/:id", authMiddleware, requiredRole, userControllers.getUserById);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar el rol de un usuario (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Actualmente solo permite cambiar el campo `role`.
 *       Devuelve el usuario completo actualizado sin `password`
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserPut"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       400:
 *         $ref: "#/components/responses/MissingInputError"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.put("/:id", authMiddleware, requiredRole, validate.obligatory(["role"]), userControllers.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario (solo ADMIN)
 *     description: >
 *       Requiere rol ADMIN. Devuelve el objeto User completo que fue eliminado
 *       (sin `password`).
 *       Devuelve 404 si el usuario no existe (código Prisma P2025).
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario en Prisma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado. Devuelve el objeto eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
router.delete("/:id", authMiddleware, requiredRole, userControllers.deleteUser);

export default router;
