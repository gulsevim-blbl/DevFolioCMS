import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createProjectSchema,
  updateProjectSchema
} from "./project.validation";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject
} from "./project.service";
import { AppError } from "../../utils/AppError";

export const createProjectHandler = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createProjectSchema.parse(req.body);
  const project = await createProject(validatedData);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project
  });
});

export const getAllProjectsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await getAllProjects();

  return res.status(200).json({
    success: true,
    data: projects
  });
});

export const getProjectByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid project id", 400);
  }

  const project = await getProjectById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: project
  });
});

export const updateProjectHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid project id", 400);
  }

  const validatedData = updateProjectSchema.parse(req.body);
  const updatedProject = await updateProject(id, validatedData);

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject
  });
});

export const deleteProjectHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid project id", 400);
  }

  const result = await deleteProject(id);

  return res.status(200).json({
    success: true,
    message: result.message
  });
});