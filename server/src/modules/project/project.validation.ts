import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleTr: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  descriptionTr: z.string().nullable().optional(),
  technologies: z.string().min(1, "Technologies are required"),
  githubUrl: z.string().url("GitHub URL must be valid").optional().or(z.literal("")),
  liveUrl: z.string().url("Live URL must be valid").optional().or(z.literal("")),
  imageUrl: z.string().url("Image URL must be valid").optional().or(z.literal("")),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().int().optional()
});

export const updateProjectSchema = createProjectSchema.partial();
