"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", project_controller_1.getAllProjectsHandler);
/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project detail
 *       404:
 *         description: Project not found
 */
router.get("/:id", project_controller_1.getProjectByIdHandler);
/**
 * @openapi
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - technologies
 *             properties:
 *               title:
 *                 type: string
 *                 example: DevFolio CMS
 *               description:
 *                 type: string
 *                 example: Dynamic portfolio management system with admin panel
 *               technologies:
 *                 type: string
 *                 example: React, TypeScript, Node.js, Prisma, MySQL
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/username/devfolio-cms
 *               liveUrl:
 *                 type: string
 *                 example: https://devfolio.example.com
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/project-image.png
 *               featured:
 *                 type: boolean
 *                 example: true
 *               published:
 *                 type: boolean
 *                 example: true
 *               sortOrder:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/", auth_middleware_1.authenticate, project_controller_1.createProjectHandler);
/**
 * @openapi
 * /api/projects/{id}:
 *   patch:
 *     tags:
 *       - Projects
 *     summary: Update a project
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
 *         description: Project updated
 */
router.patch("/:id", auth_middleware_1.authenticate, project_controller_1.updateProjectHandler);
/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project
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
 *         description: Project deleted
 */
router.delete("/:id", auth_middleware_1.authenticate, project_controller_1.deleteProjectHandler);
exports.default = router;
