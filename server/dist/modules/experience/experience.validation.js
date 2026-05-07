"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExperienceSchema = exports.createExperienceSchema = void 0;
const zod_1 = require("zod");
exports.createExperienceSchema = zod_1.z.object({
    company: zod_1.z.string().min(1, "Company is required"),
    position: zod_1.z.string().min(1, "Position is required"),
    positionTr: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().min(1, "Description is required"),
    descriptionTr: zod_1.z.string().nullable().optional(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().optional().nullable(),
    isCurrent: zod_1.z.boolean().optional(),
    location: zod_1.z.string().optional(),
    sortOrder: zod_1.z.number().int().optional(),
    published: zod_1.z.boolean().optional()
});
exports.updateExperienceSchema = exports.createExperienceSchema.partial();
