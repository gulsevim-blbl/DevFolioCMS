import { z } from "zod";

export const createExperienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  positionTr: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  descriptionTr: z.string().nullable().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  isCurrent: z.boolean().optional(),
  location: z.string().optional(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional()
});

export const updateExperienceSchema = createExperienceSchema.partial();
