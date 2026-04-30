import { Router } from "express";
import { loginHandler } from "./auth.controller";

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@devfolio.com
 *               password:
 *                 type: string
 *                 example: Admin123*
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid request or credentials
 */
router.post("/login", loginHandler);

export default router;