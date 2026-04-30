import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.number().int().min(0).max(100).optional(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional()
});

export const updateSkillSchema = createSkillSchema.partial();