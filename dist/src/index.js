"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middleware/error");
dotenv_1.default.config();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
const prisma = new client_1.PrismaClient();
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.use(express_1.default.json());
            app.use((0, morgan_1.default)("dev"));
            app.use(express_1.default.static("./public"));
            app.use(error_1.errorHandler);
            app.get("/", (req, res) => {
                res.send("Welcome to Easy");
            });
            app.use("/api", routes_1.default);
            app.listen(Number(port), "127.0.0.1", () => console.log(`Server running on http://localhost:${port}`));
        }
        catch (error) {
            console.error("Prisma Error:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main().catch((e) => {
    console.error("Error in main function:", e);
    process.exit(1);
});
