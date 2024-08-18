"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.userEditSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(13),
    fullName: zod_1.z.string().min(4),
    phone: zod_1.z.string().min(13).max(13).optional(),
});
exports.userEditSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    fullName: zod_1.z.string().min(4),
    phone: zod_1.z.string().min(13).max(13).optional(),
});
exports.loginValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4)
});
