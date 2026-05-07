"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.upsertProfile = upsertProfile;
exports.updateProfileCv = updateProfileCv;
exports.updateProfileImage = updateProfileImage;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_1 = require("../../utils/AppError");
async function getProfile() {
    return prisma_1.default.profile.findFirst();
}
async function upsertProfile(input) {
    const existingProfile = await prisma_1.default.profile.findFirst();
    const data = {
        fullName: input.fullName,
        title: input.title,
        titleTr: input.titleTr || null,
        shortBio: input.shortBio,
        shortBioTr: input.shortBioTr || null,
        about: input.about,
        aboutTr: input.aboutTr || null,
        email: input.email,
        phone: input.phone || null,
        location: input.location || null,
        githubUrl: input.githubUrl || null,
        linkedinUrl: input.linkedinUrl || null,
        cvUrl: input.cvUrl || null,
        imageUrl: input.imageUrl || null
    };
    if (!existingProfile) {
        return prisma_1.default.profile.create({
            data
        });
    }
    return prisma_1.default.profile.update({
        where: {
            id: existingProfile.id
        },
        data
    });
}
async function updateProfileCv(cvUrl) {
    const existingProfile = await prisma_1.default.profile.findFirst();
    if (!existingProfile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    return prisma_1.default.profile.update({
        where: {
            id: existingProfile.id
        },
        data: {
            cvUrl
        }
    });
}
async function updateProfileImage(imageUrl) {
    const existingProfile = await prisma_1.default.profile.findFirst();
    if (!existingProfile) {
        throw new AppError_1.AppError("Profile not found", 404);
    }
    return prisma_1.default.profile.update({
        where: {
            id: existingProfile.id
        },
        data: {
            imageUrl
        }
    });
}
