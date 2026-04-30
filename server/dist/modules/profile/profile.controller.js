"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileCvHandler = exports.upsertProfileHandler = exports.getProfileHandler = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const AppError_1 = require("../../utils/AppError");
const profile_validation_1 = require("./profile.validation");
const profile_service_1 = require("./profile.service");
exports.getProfileHandler = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const profile = await (0, profile_service_1.getProfile)();
    return res.status(200).json({
        success: true,
        data: profile
    });
});
exports.upsertProfileHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = profile_validation_1.upsertProfileSchema.parse(req.body);
    const profile = await (0, profile_service_1.upsertProfile)(validatedData);
    return res.status(200).json({
        success: true,
        message: "Profile saved successfully",
        data: profile
    });
});
exports.uploadProfileCvHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.file) {
        throw new AppError_1.AppError("CV file is required", 400);
    }
    const cvUrl = `${req.protocol}://${req.get("host")}/uploads/cv/${req.file.filename}`;
    const profile = await (0, profile_service_1.updateProfileCv)(cvUrl);
    return res.status(200).json({
        success: true,
        message: "CV uploaded successfully",
        data: profile
    });
});
