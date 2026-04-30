import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { authenticate } from "../../middlewares/auth.middleware";
import { AppError } from "../../utils/AppError";
import {
  getProfileHandler,
  uploadProfileCvHandler,
  uploadProfileImageHandler,
  upsertProfileHandler
} from "./profile.controller";

const router = Router();
const cvUploadDir = path.resolve(process.cwd(), "uploads", "cv");
const avatarUploadDir = path.resolve(process.cwd(), "uploads", "avatar");

fs.mkdirSync(cvUploadDir, { recursive: true });
fs.mkdirSync(avatarUploadDir, { recursive: true });

const cvUpload = multer({
  storage: multer.diskStorage({
    destination: cvUploadDir,
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `cv-${Date.now()}${extension}`);
    }
  }),
  fileFilter: (_req, file, callback) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new AppError("Only PDF, DOC, or DOCX files are allowed", 400));
      return;
    }

    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: avatarUploadDir,
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `avatar-${Date.now()}${extension}`);
    }
  }),
  fileFilter: (_req, file, callback) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new AppError("Only JPEG, PNG, WebP or GIF images are allowed", 400));
      return;
    }

    callback(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get profile information
 *     responses:
 *       200:
 *         description: Profile data
 */
router.get("/", getProfileHandler);

router.post("/cv", authenticate, cvUpload.single("cv"), uploadProfileCvHandler);
router.post("/image", authenticate, avatarUpload.single("image"), uploadProfileImageHandler);

/**
 * @openapi
 * /api/profile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Create or update profile
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
 *               - title
 *               - bio
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               title:
 *                 type: string
 *                 example: Full Stack Developer
 *               bio:
 *                 type: string
 *                 example: Passionate developer with 5+ years experience
 *               avatarUrl:
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: +1-234-567-8900
 *               location:
 *                 type: string
 *                 example: New York, NY
 *               website:
 *                 type: string
 *                 example: https://johndoe.dev
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/johndoe
 *               twitterUrl:
 *                 type: string
 *                 example: https://twitter.com/johndoe
 *               published:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Profile saved successfully
 *       400:
 *         description: Invalid request data
 */
router.put("/", authenticate, upsertProfileHandler);

export default router;
