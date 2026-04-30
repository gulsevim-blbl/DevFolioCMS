"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkillSchema = exports.createSkillSchema = void 0;
const zod_1 = require("zod");
exports.createSkillSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Skill name is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    level: zod_1.z.number().int().min(0).max(100).optional(),
    sortOrder: zod_1.z.number().int().optional(),
    published: zod_1.z.boolean().optional()
});
exports.updateSkillSchema = exports.createSkillSchema.partial();
