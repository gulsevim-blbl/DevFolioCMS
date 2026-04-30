"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const project_routes_1 = __importDefault(require("../modules/project/project.routes"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const skill_routes_1 = __importDefault(require("../modules/skill/skill.routes"));
const experience_routes_1 = __importDefault(require("../modules/experience/experience.routes"));
const profile_routes_1 = __importDefault(require("../modules/profile/profile.routes"));
const router = (0, express_1.Router)();
/**
 * @openapi
 * /api/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check if API is running
 *     responses:
 *       200:
 *         description: API is running successfully
 */
router.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully"
    });
});
/**
 * @openapi
 * /api/protected:
 *   get:
 *     tags:
 *       - Protected
 *     summary: Test protected route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized request
 */
router.get("/protected", auth_middleware_1.authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You have access to this protected route",
        user: req.user
    });
});
router.use("/auth", auth_routes_1.default);
router.use("/projects", project_routes_1.default);
router.use("/skills", skill_routes_1.default);
router.use("/experiences", experience_routes_1.default);
router.use("/profile", profile_routes_1.default);
exports.default = router;
