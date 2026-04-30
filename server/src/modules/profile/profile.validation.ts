import { z } from "zod";

export const upsertProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Title is required"),
  shortBio: z.string().min(1, "Short bio is required"),
  about: z.string().min(1, "About is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  githubUrl: z.string().url("GitHub URL must be valid").nullable().optional().or(z.literal("")),
  linkedinUrl: z.string().url("LinkedIn URL must be valid").nullable().optional().or(z.literal("")),
  cvUrl: z.string().url("CV URL must be valid").nullable().optional().or(z.literal("")),
  imageUrl: z.string().url("Image URL must be valid").nullable().optional().or(z.literal(""))
});
