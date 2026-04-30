"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const skill_controller_1 = require("./skill.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/skills:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get all skills
 *     responses:
 *       200:
 *         description: List of skills
 */
router.get("/", skill_controller_1.getAllSkillsHandler);
/**
 * @openapi
 * /api/skills/{id}:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get skill by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Skill detail
 *       404:
 *         description: Skill not found
 */
router.get("/:id", skill_controller_1.getSkillByIdHandler);
/**
 * @openapi
 * /api/skills:
 *   post:
 *     tags:
 *       - Skills
 *     summary: Create a new skill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: JavaScript
 *               category:
 *                 type: string
 *                 example: Frontend
 *               level:
 *                 type: integer
 *                 example: 80
 *               sortOrder:
 *                 type: integer
 *                 example: 1
 *               published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Skill created
 */
router.post("/", auth_middleware_1.authenticate, skill_controller_1.createSkillHandler);
/**
 * @openapi
 * /api/skills/{id}:
 *   patch:
 *     tags:
 *       - Skills
 *     summary: Update a skill
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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               level:
 *                 type: integer
 *               sortOrder:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Skill updated
 *       404:
 *         description: Skill not found
 */
router.patch("/:id", auth_middleware_1.authenticate, skill_controller_1.updateSkillHandler);
/**
 * @openapi
 * /api/skills/{id}:
 *   delete:
 *     tags:
 *       - Skills
 *     summary: Delete a skill
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
 *         description: Skill deleted
 *       404:
 *         description: Skill not found
 */
router.delete("/:id", auth_middleware_1.authenticate, skill_controller_1.deleteSkillHandler);
exports.default = router;
