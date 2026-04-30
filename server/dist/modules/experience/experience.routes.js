"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const experience_controller_1 = require("./experience.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/experiences:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Get all experiences
 *     responses:
 *       200:
 *         description: List of experiences
 */
router.get("/", experience_controller_1.getAllExperiencesHandler);
/**
 * @openapi
 * /api/experiences/{id}:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Get experience by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experience detail
 *       404:
 *         description: Experience not found
 */
router.get("/:id", experience_controller_1.getExperienceByIdHandler);
/**
 * @openapi
 * /api/experiences:
 *   post:
 *     tags:
 *       - Experiences
 *     summary: Create a new experience
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *               - description
 *               - startDate
 *             properties:
 *               company:
 *                 type: string
 *                 example: OpenAI
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               description:
 *                 type: string
 *                 example: Built and maintained full-stack web applications
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-01-01T00:00:00.000Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: 2025-01-01T00:00:00.000Z
 *               isCurrent:
 *                 type: boolean
 *                 example: false
 *               location:
 *                 type: string
 *                 example: Istanbul, Turkey
 *               sortOrder:
 *                 type: integer
 *                 example: 1
 *               published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Experience created
 */
router.post("/", auth_middleware_1.authenticate, experience_controller_1.createExperienceHandler);
/**
 * @openapi
 * /api/experiences/{id}:
 *   patch:
 *     tags:
 *       - Experiences
 *     summary: Update an experience
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
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               isCurrent:
 *                 type: boolean
 *               location:
 *                 type: string
 *               sortOrder:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Experience updated
 *       404:
 *         description: Experience not found
 */
router.patch("/:id", auth_middleware_1.authenticate, experience_controller_1.updateExperienceHandler);
/**
 * @openapi
 * /api/experiences/{id}:
 *   delete:
 *     tags:
 *       - Experiences
 *     summary: Delete an experience
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
 *         description: Experience deleted
 *       404:
 *         description: Experience not found
 */
router.delete("/:id", auth_middleware_1.authenticate, experience_controller_1.deleteExperienceHandler);
exports.default = router;
3;
