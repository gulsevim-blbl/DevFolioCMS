"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_1 = require("../../utils/AppError");
async function loginUser(input) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: input.email
        }
    });
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const isPasswordCorrect = await bcryptjs_1.default.compare(input.password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email
    }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
}
