"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperienceHandler = exports.updateExperienceHandler = exports.getExperienceByIdHandler = exports.getAllExperiencesHandler = exports.createExperienceHandler = void 0;
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const experience_validation_1 = require("./experience.validation");
const experience_service_1 = require("./experience.service");
exports.createExperienceHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = experience_validation_1.createExperienceSchema.parse(req.body);
    const experience = await (0, experience_service_1.createExperience)(validatedData);
    return res.status(201).json({
        success: true,
        message: "Experience created successfully",
        data: experience
    });
});
exports.getAllExperiencesHandler = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const experiences = await (0, experience_service_1.getAllExperiences)();
    return res.status(200).json({
        success: true,
        data: experiences
    });
});
exports.getExperienceByIdHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid experience id", 400);
    }
    const experience = await (0, experience_service_1.getExperienceById)(id);
    if (!experience) {
        throw new AppError_1.AppError("Experience not found", 404);
    }
    return res.status(200).json({
        success: true,
        data: experience
    });
});
exports.updateExperienceHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid experience id", 400);
    }
    const validatedData = experience_validation_1.updateExperienceSchema.parse(req.body);
    const updatedExperience = await (0, experience_service_1.updateExperience)(id, validatedData);
    return res.status(200).json({
        success: true,
        message: "Experience updated successfully",
        data: updatedExperience
    });
});
exports.deleteExperienceHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid experience id", 400);
    }
    const result = await (0, experience_service_1.deleteExperience)(id);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
