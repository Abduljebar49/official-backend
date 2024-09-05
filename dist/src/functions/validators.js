"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentSchema = exports.courseEditSchema = exports.courseSchema = exports.loginValidation = exports.userEditSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(13),
    fullName: zod_1.z.string().min(4),
    phone: zod_1.z.string().min(13).max(13).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.userEditSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    fullName: zod_1.z.string().min(4).optional(),
    phone: zod_1.z.string().min(13).max(13).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.loginValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
});
exports.courseSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    image: zod_1.z.string().min(5),
    content: zod_1.z.string().min(10),
    duration: zod_1.z.string().min(1),
    price: zod_1.z.number().min(1),
    prerequisites: zod_1.z.string().optional(),
    instructorId: zod_1.z.string().uuid(),
});
exports.courseEditSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).optional(),
    description: zod_1.z.string().min(10).optional(),
    image: zod_1.z.string().min(5).optional(),
    content: zod_1.z.string().min(10).optional(),
    duration: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().min(1).optional(),
    prerequisites: zod_1.z.string().optional().optional(),
    instructorId: zod_1.z.string().uuid().optional(),
});
exports.enrollmentSchema = zod_1.z.object({
    courseId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    status: zod_1.z.enum(["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"]).default("PENDING"),
});
