"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkill = createSkill;
exports.getAllSkills = getAllSkills;
exports.getSkillById = getSkillById;
exports.updateSkill = updateSkill;
exports.deleteSkill = deleteSkill;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_1 = require("../../utils/AppError");
async function createSkill(input) {
    return prisma_1.default.skill.create({
        data: {
            name: input.name,
            category: input.category,
            level: input.level ?? 50,
            sortOrder: input.sortOrder ?? 0,
            published: input.published ?? true
        }
    });
}
async function getAllSkills() {
    return prisma_1.default.skill.findMany({
        orderBy: [
            { category: "asc" },
            { sortOrder: "asc" },
            { createdAt: "desc" }
        ]
    });
}
async function getSkillById(id) {
    return prisma_1.default.skill.findUnique({
        where: { id }
    });
}
async function updateSkill(id, input) {
    const existingSkill = await prisma_1.default.skill.findUnique({
        where: { id }
    });
    if (!existingSkill) {
        throw new AppError_1.AppError("Skill not found", 404);
    }
    return prisma_1.default.skill.update({
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
async function deleteSkill(id) {
    const existingSkill = await prisma_1.default.skill.findUnique({
        where: { id }
    });
    if (!existingSkill) {
        throw new AppError_1.AppError("Skill not found", 404);
    }
    await prisma_1.default.skill.delete({
        where: { id }
    });
    return { message: "Skill deleted successfully" };
}
