"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../generated/prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL tanımlı değil.");
}
const adapter = new adapter_mariadb_1.PrismaMariaDb(connectionString);
const prismaClientSingleton = () => {
    return new client_1.PrismaClient({
        adapter,
    });
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}
exports.default = prisma;
