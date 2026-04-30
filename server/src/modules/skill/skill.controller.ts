import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createSkillSchema,
  updateSkillSchema
} from "./skill.validation";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkillById,
  updateSkill
} from "./skill.service";

export const createSkillHandler = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createSkillSchema.parse(req.body);
  const skill = await createSkill(validatedData);

  return res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill
  });
});

export const getAllSkillsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await getAllSkills();

  return res.status(200).json({
    success: true,
    data: skills
  });
});

export const getSkillByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid skill id", 400);
  }

  const skill = await getSkillById(id);

  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: skill
  });
});

export const updateSkillHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid skill id", 400);
  }

  const validatedData = updateSkillSchema.parse(req.body);
  const updatedSkill = await updateSkill(id, validatedData);

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: updatedSkill
  });
});

export const deleteSkillHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid skill id", 400);
  }

  const result = await deleteSkill(id);

  return res.status(200).json({
    success: true,
    message: result.message
  });
});