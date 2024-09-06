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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicPaths = [
            "/api/users",
            "/api/auth/login",
        ];
        console.log("url : ", req.originalUrl);
        if (publicPaths.includes(req.originalUrl)) {
            return next();
        }
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.sendStatus(401);
            }
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).send({
                        statusCode: 403,
                        message: "Unauthorized",
                    });
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).send({
                statusCode: 401,
                message: "Unauthorized",
            });
        }
    }
    catch (e) {
        console.error(e);
        res.status(401).send({
            message: "Unauthenticated",
            error: e,
        });
    }
});
exports.default = authHandler;
