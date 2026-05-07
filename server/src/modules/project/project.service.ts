import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

type CreateProjectInput = {
  title: string;
  titleTr?: string | null;
  description: string;
  descriptionTr?: string | null;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
};

type UpdateProjectInput = Partial<CreateProjectInput>;

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function createProject(input: CreateProjectInput) {
  const baseSlug = generateSlug(input.title);

  let slug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return prisma.project.create({
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

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ]
  });
}

export async function getProjectById(id: number) {
  return prisma.project.findUnique({
    where: { id }
  });
}

export async function updateProject(id: number, input: UpdateProjectInput) {
  const existingProject = await prisma.project.findUnique({
    where: { id }
  });

  if (!existingProject) {
    throw new AppError("Project not found", 404);
  }

  return prisma.project.update({
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

export async function deleteProject(id: number) {
  const existingProject = await prisma.project.findUnique({
    where: { id }
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({
    where: { id }
  });

  return { message: "Project deleted successfully" };
}
