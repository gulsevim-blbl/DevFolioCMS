"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const AppError_1 = require("../../utils/AppError");
const profile_controller_1 = require("./profile.controller");
const router = (0, express_1.Router)();
const cvUploadDir = path_1.default.resolve(process.cwd(), "uploads", "cv");
const avatarUploadDir = path_1.default.resolve(process.cwd(), "uploads", "avatar");
fs_1.default.mkdirSync(cvUploadDir, { recursive: true });
fs_1.default.mkdirSync(avatarUploadDir, { recursive: true });
const cvUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: cvUploadDir,
        filename: (_req, file, callback) => {
            const extension = path_1.default.extname(file.originalname).toLowerCase();
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
            callback(new AppError_1.AppError("Only PDF, DOC, or DOCX files are allowed", 400));
            return;
        }
        callback(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
const avatarUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: avatarUploadDir,
        filename: (_req, file, callback) => {
            const extension = path_1.default.extname(file.originalname).toLowerCase();
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
            callback(new AppError_1.AppError("Only JPEG, PNG, WebP or GIF images are allowed", 400));
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
router.get("/", profile_controller_1.getProfileHandler);
router.post("/cv", auth_middleware_1.authenticate, cvUpload.single("cv"), profile_controller_1.uploadProfileCvHandler);
router.post("/image", auth_middleware_1.authenticate, avatarUpload.single("image"), profile_controller_1.uploadProfileImageHandler);
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
router.put("/", auth_middleware_1.authenticate, profile_controller_1.upsertProfileHandler);
exports.default = router;
