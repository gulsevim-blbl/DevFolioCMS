"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProfileSchema = void 0;
const zod_1 = require("zod");
exports.upsertProfileSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    title: zod_1.z.string().min(1, "Title is required"),
    shortBio: zod_1.z.string().min(1, "Short bio is required"),
    about: zod_1.z.string().min(1, "About is required"),
    email: zod_1.z.string().email("Please enter a valid email"),
    phone: zod_1.z.string().nullable().optional(),
    location: zod_1.z.string().nullable().optional(),
    githubUrl: zod_1.z.string().url("GitHub URL must be valid").nullable().optional().or(zod_1.z.literal("")),
    linkedinUrl: zod_1.z.string().url("LinkedIn URL must be valid").nullable().optional().or(zod_1.z.literal("")),
    cvUrl: zod_1.z.string().url("CV URL must be valid").nullable().optional().or(zod_1.z.literal("")),
    imageUrl: zod_1.z.string().url("Image URL must be valid").nullable().optional().or(zod_1.z.literal(""))
});
