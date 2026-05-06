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
function normalizeSkillName(name) {
    const trimmedName = name.trim();
    const key = trimmedName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const aliases = {
        angular: "Angular",
        bootstrap: "Bootstrap",
        c: "C",
        cpp: "C++",
        cplusplus: "C++",
        csharp: "C#",
        css: "CSS3",
        css3: "CSS3",
        docker: "Docker",
        git: "Git",
        html: "HTML5",
        html5: "HTML5",
        javascript: "JavaScript",
        js: "JavaScript",
        k8s: "Kubernetes",
        kubernetes: "Kubernetes",
        linux: "Linux",
        mongodb: "MongoDB",
        mssql: "SQL",
        mysql: "MySQL",
        next: "Next.js",
        nextjs: "Next.js",
        node: "Node.js",
        nodejs: "Node.js",
        php: "PHP",
        postgresql: "PostgreSQL",
        postgres: "PostgreSQL",
        python: "Python",
        react: "React",
        rust: "Rust",
        sql: "SQL",
        tailwind: "Tailwind CSS",
        tailwindcss: "Tailwind CSS",
        ts: "TypeScript",
        typescript: "TypeScript",
        vue: "Vue.js",
        vuejs: "Vue.js",
        vue2: "Vue.js",
        vue3: "Vue.js"
    };
    return aliases[key] ?? trimmedName;
}
async function createSkill(input) {
    return prisma_1.default.skill.create({
        data: {
            name: normalizeSkillName(input.name),
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
            name: input.name === undefined ? undefined : normalizeSkillName(input.name),
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
