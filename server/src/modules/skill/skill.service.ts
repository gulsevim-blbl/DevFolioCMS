import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

type CreateSkillInput = {
  name: string;
  category: string;
  level?: number;
  sortOrder?: number;
  published?: boolean;
};

type UpdateSkillInput = Partial<CreateSkillInput>;

function normalizeSkillName(name: string) {
  const trimmedName = name.trim();
  const key = trimmedName.toLowerCase().replace(/[^a-z0-9]/g, "");

  const aliases: Record<string, string> = {
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

export async function createSkill(input: CreateSkillInput) {
  return prisma.skill.create({
    data: {
      name: normalizeSkillName(input.name),
      category: input.category,
      level: input.level ?? 50,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true
    }
  });
}

export async function getAllSkills() {
  return prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ]
  });
}

export async function getSkillById(id: number) {
  return prisma.skill.findUnique({
    where: { id }
  });
}

export async function updateSkill(id: number, input: UpdateSkillInput) {
  const existingSkill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!existingSkill) {
    throw new AppError("Skill not found", 404);
  }

  return prisma.skill.update({
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

export async function deleteSkill(id: number) {
  const existingSkill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!existingSkill) {
    throw new AppError("Skill not found", 404);
  }

  await prisma.skill.delete({
    where: { id }
  });

  return { message: "Skill deleted successfully" };
}
