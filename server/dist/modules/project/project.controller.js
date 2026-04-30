"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectHandler = exports.updateProjectHandler = exports.getProjectByIdHandler = exports.getAllProjectsHandler = exports.createProjectHandler = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const project_validation_1 = require("./project.validation");
const project_service_1 = require("./project.service");
const AppError_1 = require("../../utils/AppError");
exports.createProjectHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = project_validation_1.createProjectSchema.parse(req.body);
    const project = await (0, project_service_1.createProject)(validatedData);
    return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project
    });
});
exports.getAllProjectsHandler = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const projects = await (0, project_service_1.getAllProjects)();
    return res.status(200).json({
        success: true,
        data: projects
    });
});
exports.getProjectByIdHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid project id", 400);
    }
    const project = await (0, project_service_1.getProjectById)(id);
    if (!project) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    return res.status(200).json({
        success: true,
        data: project
    });
});
exports.updateProjectHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid project id", 400);
    }
    const validatedData = project_validation_1.updateProjectSchema.parse(req.body);
    const updatedProject = await (0, project_service_1.updateProject)(id, validatedData);
    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject
    });
});
exports.deleteProjectHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        throw new AppError_1.AppError("Invalid project id", 400);
    }
    const result = await (0, project_service_1.deleteProject)(id);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
