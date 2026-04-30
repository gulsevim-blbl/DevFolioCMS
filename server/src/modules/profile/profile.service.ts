import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

type UpsertProfileInput = {
  fullName: string;
  title: string;
  shortBio: string;
  about: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  cvUrl?: string | null;
  imageUrl?: string | null;
};

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function upsertProfile(input: UpsertProfileInput) {
  const existingProfile = await prisma.profile.findFirst();

  const data = {
    fullName: input.fullName,
    title: input.title,
    shortBio: input.shortBio,
    about: input.about,
    email: input.email,
    phone: input.phone || null,
    location: input.location || null,
    githubUrl: input.githubUrl || null,
    linkedinUrl: input.linkedinUrl || null,
    cvUrl: input.cvUrl || null,
    imageUrl: input.imageUrl || null
  };

  if (!existingProfile) {
    return prisma.profile.create({
      data
    });
  }

  return prisma.profile.update({
    where: {
      id: existingProfile.id
    },
    data
  });
}

export async function updateProfileCv(cvUrl: string) {
  const existingProfile = await prisma.profile.findFirst();

  if (!existingProfile) {
    throw new AppError("Profile not found", 404);
  }

  return prisma.profile.update({
    where: {
      id: existingProfile.id
    },
    data: {
      cvUrl
    }
  });
}

export async function updateProfileImage(imageUrl: string) {
  const existingProfile = await prisma.profile.findFirst();

  if (!existingProfile) {
    throw new AppError("Profile not found", 404);
  }

  return prisma.profile.update({
    where: {
      id: existingProfile.id
    },
    data: {
      imageUrl
    }
  });
}
