"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
function errorMiddleware(error, _req, res, _next) {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }
    console.error("Unexpected error:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
