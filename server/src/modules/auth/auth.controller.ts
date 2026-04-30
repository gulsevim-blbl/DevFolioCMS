import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginSchema } from "./auth.validation";
import { loginUser } from "./auth.service";

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const result = await loginUser(validatedData);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  });
});