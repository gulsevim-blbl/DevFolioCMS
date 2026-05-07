"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.getAllProjects = getAllProjects;
exports.getProjectById = getProjectById;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_1 = require("../../utils/AppError");
function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}
async function createProject(input) {
    const baseSlug = generateSlug(input.title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma_1.default.project.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return prisma_1.default.project.create({
        data: {
            title: input.title,
            titleTr: input.titleTr || null,
            slug,
            description: input.description,
            descriptionTr: input.descriptionTr || null,
            technologies: input.technologies,
            githubUrl: input.githubUrl || null,
            liveUrl: input.liveUrl || null,
            imageUrl: input.imageUrl || null,
            featured: input.featured ?? false,
            published: input.published ?? true,
            sortOrder: input.sortOrder ?? 0
        }
    });
}
async function getAllProjects() {
    return prisma_1.default.project.findMany({
        orderBy: [
            { sortOrder: "asc" },
            { createdAt: "desc" }
        ]
    });
}
async function getProjectById(id) {
    return prisma_1.default.project.findUnique({
        where: { id }
    });
}
async function updateProject(id, input) {
    const existingProject = await prisma_1.default.project.findUnique({
        where: { id }
    });
    if (!existingProject) {
        throw new AppError_1.AppError("Project not found", 404);
    }
    return prisma_1.default.project.update({
        where: { id },
        data: {
            title: input.title,
            titleTr: input.titleTr === "" ? null : input.titleTr,
            description: input.description,
            descriptionTr: input.descriptionTr === "" ? null : input.descriptionTr,
            technologies: input.technologies,
            githubUrl: input.githubUrl === "" ? null : input.githubUrl,
            liveUrl: input.liveUrl === "" ? null : input.liveUrl,
            imageUrl: input.imageUrl === "" ? null : input.imageUrl,
            featured: input.featured,
            published: input.published,
            sortOrder: input.sortOrder
        }
    });
}
async function deleteProject(id) {
    const existingProject = await prisma_1.default.project.findUnique({
        where: { id }
    });
    if (!existingProject) {
        throw new Error("Project not found");
    }
    await prisma_1.default.project.delete({
        where: { id }
    });
    return { message: "Project deleted successfully" };
}
