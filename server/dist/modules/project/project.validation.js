"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    titleTr: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().min(1, "Description is required"),
    descriptionTr: zod_1.z.string().nullable().optional(),
    technologies: zod_1.z.string().min(1, "Technologies are required"),
    githubUrl: zod_1.z.string().url("GitHub URL must be valid").optional().or(zod_1.z.literal("")),
    liveUrl: zod_1.z.string().url("Live URL must be valid").optional().or(zod_1.z.literal("")),
    imageUrl: zod_1.z.string().url("Image URL must be valid").optional().or(zod_1.z.literal("")),
    featured: zod_1.z.boolean().optional(),
    published: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().int().optional()
});
exports.updateProjectSchema = exports.createProjectSchema.partial();
