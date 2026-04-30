import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { upsertProfileSchema } from "./profile.validation";
import { getProfile, updateProfileCv, updateProfileImage, upsertProfile } from "./profile.service";

export const getProfileHandler = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await getProfile();

  return res.status(200).json({
    success: true,
    data: profile
  });
});

export const upsertProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = upsertProfileSchema.parse(req.body);

  const profile = await upsertProfile(validatedData);

  return res.status(200).json({
    success: true,
    message: "Profile saved successfully",
    data: profile
  });
});

export const uploadProfileCvHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("CV file is required", 400);
  }

  const cvUrl = `${req.protocol}://${req.get("host")}/uploads/cv/${req.file.filename}`;
  const profile = await updateProfileCv(cvUrl);

  return res.status(200).json({
    success: true,
    message: "CV uploaded successfully",
    data: profile
  });
});

export const uploadProfileImageHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError("Profile image is required", 400);
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/avatar/${req.file.filename}`;
  const profile = await updateProfileImage(imageUrl);

  return res.status(200).json({
    success: true,
    message: "Profile image uploaded successfully",
    data: profile
  });
});
