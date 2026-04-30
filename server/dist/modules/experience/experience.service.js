"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperience = createExperience;
exports.getAllExperiences = getAllExperiences;
exports.getExperienceById = getExperienceById;
exports.updateExperience = updateExperience;
exports.deleteExperience = deleteExperience;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_1 = require("../../utils/AppError");
async function createExperience(input) {
    return prisma_1.default.experience.create({
        data: {
            company: input.company,
            position: input.position,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate ?? null,
            isCurrent: input.isCurrent ?? false,
            location: input.location || null,
            sortOrder: input.sortOrder ?? 0,
            published: input.published ?? true
        }
    });
}
async function getAllExperiences() {
    return prisma_1.default.experience.findMany({
        orderBy: [
            { sortOrder: "asc" },
            { startDate: "desc" }
        ]
    });
}
async function getExperienceById(id) {
    return prisma_1.default.experience.findUnique({
        where: { id }
    });
}
async function updateExperience(id, input) {
    const existingExperience = await prisma_1.default.experience.findUnique({
        where: { id }
    });
    if (!existingExperience) {
        throw new AppError_1.AppError("Experience not found", 404);
    }
    return prisma_1.default.experience.update({
        where: { id },
        data: {
            company: input.company,
            position: input.position,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate,
            isCurrent: input.isCurrent,
            location: input.location === "" ? null : input.location,
            sortOrder: input.sortOrder,
            published: input.published
        }
    });
}
async function deleteExperience(id) {
    const existingExperience = await prisma_1.default.experience.findUnique({
        where: { id }
    });
    if (!existingExperience) {
        throw new AppError_1.AppError("Experience not found", 404);
    }
    await prisma_1.default.experience.delete({
        where: { id }
    });
    return { message: "Experience deleted successfully" };
}
