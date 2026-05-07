import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";


type CreateExperienceInput = {
  company: string;
  position: string;
  positionTr?: string | null;
  description: string;
  descriptionTr?: string | null;
  startDate: Date;
  endDate?: Date | null;
  isCurrent?: boolean;
  location?: string;
  sortOrder?: number;
  published?: boolean;
};

type UpdateExperienceInput = Partial<CreateExperienceInput>;

export async function createExperience(input: CreateExperienceInput) {
  return prisma.experience.create({
    data: {
      company: input.company,
      position: input.position,
      positionTr: input.positionTr || null,
      description: input.description,
      descriptionTr: input.descriptionTr || null,
      startDate: input.startDate,
      endDate: input.endDate ?? null,
      isCurrent: input.isCurrent ?? false,
      location: input.location || null,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true
    }
  });
}

export async function getAllExperiences() {
  return prisma.experience.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { startDate: "desc" }
    ]
  });
}

export async function getExperienceById(id: number) {
  return prisma.experience.findUnique({
    where: { id }
  });
}

export async function updateExperience(id: number, input: UpdateExperienceInput) {
  const existingExperience = await prisma.experience.findUnique({
    where: { id }
  });

  if (!existingExperience) {
    throw new AppError("Experience not found", 404
    );
  }

  return prisma.experience.update({
    where: { id },
    data: {
      company: input.company,
      position: input.position,
      positionTr: input.positionTr === "" ? null : input.positionTr,
      description: input.description,
      descriptionTr: input.descriptionTr === "" ? null : input.descriptionTr,
      startDate: input.startDate,
      endDate: input.endDate,
      isCurrent: input.isCurrent,
      location: input.location === "" ? null : input.location,
      sortOrder: input.sortOrder,
      published: input.published
    }
  });
}

export async function deleteExperience(id: number) {
  const existingExperience = await prisma.experience.findUnique({
    where: { id }
  });

  if (!existingExperience) {
    throw new AppError("Experience not found", 404);
  }

  await prisma.experience.delete({
    where: { id }
  });

  return { message: "Experience deleted successfully" };
}
