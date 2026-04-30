import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

type CreateSkillInput = {
  name: string;
  category: string;
  level?: number;
  sortOrder?: number;
  published?: boolean;
};

type UpdateSkillInput = Partial<CreateSkillInput>;

export async function createSkill(input: CreateSkillInput) {
  return prisma.skill.create({
    data: {
      name: input.name,
      category: input.category,
      level: input.level ?? 50,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true
    }
  });
}

export async function getAllSkills() {
  return prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ]
  });
}

export async function getSkillById(id: number) {
  return prisma.skill.findUnique({
    where: { id }
  });
}

export async function updateSkill(id: number, input: UpdateSkillInput) {
  const existingSkill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!existingSkill) {
    throw new AppError("Skill not found", 404);
  }

  return prisma.skill.update({
    where: { id },
    data: {
      name: input.name,
      category: input.category,
      level: input.level,
      sortOrder: input.sortOrder,
      published: input.published
    }
  });
}

export async function deleteSkill(id: number) {
  const existingSkill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!existingSkill) {
    throw new AppError("Skill not found", 404);
  }

  await prisma.skill.delete({
    where: { id }
  });

  return { message: "Skill deleted successfully" };
}