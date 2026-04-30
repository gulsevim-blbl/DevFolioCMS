import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/project/project.routes";
import { authenticate } from "../middlewares/auth.middleware";
import skillRoutes from "../modules/skill/skill.routes";
import experienceRoutes from "../modules/experience/experience.routes";
import profileRoutes from "../modules/profile/profile.routes";

const router = Router();

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
router.get("/protected", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have access to this protected route",
    user: req.user
  });
});

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/experiences", experienceRoutes);
router.use("/profile", profileRoutes);

export default router;