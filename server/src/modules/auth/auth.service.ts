import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";


type LoginInput = {
  email: string;
  password: string;
};

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(input.password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const secret = process.env.JWT_SECRET!;

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    secret as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  ) as string;

  return {
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
}