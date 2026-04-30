import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createSkillHandler,
  deleteSkillHandler,
  getAllSkillsHandler,
  getSkillByIdHandler,
  updateSkillHandler
} from "./skill.controller";

const router = Router();

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
router.get("/", getAllSkillsHandler);

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
router.get("/:id", getSkillByIdHandler);

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
router.post("/", authenticate, createSkillHandler);

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
router.patch("/:id", authenticate, updateSkillHandler);

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
router.delete("/:id", authenticate, deleteSkillHandler);

export default router;