"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DevFolio CMS API",
            version: "1.0.0",
            description: "Dynamic developer portfolio platform API documentation"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/routes/*.ts", "./src/modules/**/*.ts"]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
