"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestEditSchema = exports.sendEmailSchema = exports.requestSchema = exports.loginValidation = exports.userEditSchema = exports.userSchema = void 0;
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
exports.requestSchema = zod_1.z.object({
    itemName: zod_1.z.string(),
    brandName: zod_1.z.string(),
    amount: zod_1.z.number(),
    userId: zod_1.z.number(),
});
exports.sendEmailSchema = zod_1.z.object({});
exports.requestEditSchema = zod_1.z.object({
    itemName: zod_1.z.string().optional(),
    brandName: zod_1.z.string().optional(),
    amount: zod_1.z.number().optional(),
    userId: zod_1.z.number().optional(),
});
