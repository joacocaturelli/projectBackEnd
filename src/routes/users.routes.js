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
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
router.get("/profile", authMiddleware, userControllers.getProfile);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (ADMIN only)
 *     tags:
 *       - Users
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
 *                $ref: "#/components/schemas/User"
 *     x-roles:
 *       - ADMIN
 */
router.get("/", authMiddleware, requiredRole, userControllers.getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID (ADMIN only)
 *     tags:
 *       - Users
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
 *               $ref: "#/components/schemas/User"
 *     x-roles:
 *       - ADMIN
 */
router.get("/:id", authMiddleware, requiredRole, userControllers.getUserById);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario (ADMIN only)
 *     tags:
 *       - Users
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
 *             $ref: "#/components/schemas/UserPut"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *     x-roles:
 *       - ADMIN
 */
router.put("/:id", authMiddleware, requiredRole, validate.updateUser, userControllers.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario (ADMIN only)
 *     tags:
 *       - Users
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
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 */
router.delete("/:id", authMiddleware, requiredRole, userControllers.deleteUser);

export default router;
