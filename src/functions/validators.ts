import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(13),
  fullName: z.string().min(4),
  phone: z.string().min(13).max(13).optional(),
  isActive: z.boolean().optional(),
});

export const userEditSchema = z.object({
  email: z.string().email().optional(),
  fullName: z.string().min(4).optional(),
  phone: z.string().min(13).max(13).optional(),
  isActive: z.boolean().optional(),
});

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const courseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  image: z.string().min(5),
  content: z.string().min(10),
  duration: z.string().min(1),
  price: z.number().min(1),
  prerequisites: z.string().optional(),
  instructorId: z.string().uuid(),
});

export const courseEditSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().min(5).optional(),
  content: z.string().min(10).optional(),
  duration: z.string().min(1).optional(),
  price: z.number().min(1).optional(),
  prerequisites: z.string().optional().optional(),
  instructorId: z.string().uuid().optional(),
});


export const enrollmentSchema = z.object({
  courseId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.enum(["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"]).default("PENDING"),
});
