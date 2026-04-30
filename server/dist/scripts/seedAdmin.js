"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../lib/prisma"));
async function main() {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: "admin@devfolio.com"
        }
    });
    if (existingUser) {
        console.log("Admin user already exists.");
        return;
    }
    const hashedPassword = await bcryptjs_1.default.hash("Admin123*", 10);
    await prisma_1.default.user.create({
        data: {
            email: "admin@devfolio.com",
            password: hashedPassword
        }
    });
    console.log("Admin user created successfully.");
}
main()
    .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
