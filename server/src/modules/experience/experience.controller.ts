import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createExperienceSchema,
  updateExperienceSchema
} from "./experience.validation";
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience
} from "./experience.service";

export const createExperienceHandler = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = createExperienceSchema.parse(req.body);
  const experience = await createExperience(validatedData);

  return res.status(201).json({
    success: true,
    message: "Experience created successfully",
    data: experience
  });
});

export const getAllExperiencesHandler = asyncHandler(async (_req: Request, res: Response) => {
  const experiences = await getAllExperiences();

  return res.status(200).json({
    success: true,
    data: experiences
  });
});

export const getExperienceByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid experience id", 400);
  }

  const experience = await getExperienceById(id);

  if (!experience) {
    throw new AppError("Experience not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: experience
  });
});

export const updateExperienceHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid experience id", 400);
  }

  const validatedData = updateExperienceSchema.parse(req.body);
  const updatedExperience = await updateExperience(id, validatedData);

  return res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: updatedExperience
  });
});

export const deleteExperienceHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid experience id", 400);
  }

  const result = await deleteExperience(id);

  return res.status(200).json({
    success: true,
    message: result.message
  });
});