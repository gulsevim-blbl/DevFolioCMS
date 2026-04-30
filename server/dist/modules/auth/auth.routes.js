"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
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
router.post("/login", auth_controller_1.loginHandler);
exports.default = router;
