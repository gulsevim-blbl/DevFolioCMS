"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkillHandler = exports.updateSkillHandler = exports.getSkillByIdHandler = exports.getAllSkillsHandler = exports.createSkillHandler = void 0;
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const skill_validation_1 = require("./skill.validation");
const skill_service_1 = require("./skill.service");
exports.createSkillHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = skill_validation_1.createSkillSchema.parse(req.body);
    const skill = await (0, skill_service_1.createSkill)(validatedData);
    return res.status(201).json({
        success: true,
        message: "Skill created successfully",
        data: skill
    });
});
exports.getAllSkillsHandler = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const skills = await (0, skill_service_1.getAllSkills)();
    return res.status(200).json({
        success: true,
        data: skills
    });
});
exports.getSkillByIdHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid skill id", 400);
    }
    const skill = await (0, skill_service_1.getSkillById)(id);
    if (!skill) {
        throw new AppError_1.AppError("Skill not found", 404);
    }
    return res.status(200).json({
        success: true,
        data: skill
    });
});
exports.updateSkillHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid skill id", 400);
    }
    const validatedData = skill_validation_1.updateSkillSchema.parse(req.body);
    const updatedSkill = await (0, skill_service_1.updateSkill)(id, validatedData);
    return res.status(200).json({
        success: true,
        message: "Skill updated successfully",
        data: updatedSkill
    });
});
exports.deleteSkillHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid skill id", 400);
    }
    const result = await (0, skill_service_1.deleteSkill)(id);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
