import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(13),
  fullName: z.string().min(4),
  phone: z.string().min(13).max(13).optional(),
});

export const userEditSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(4),
  phone: z.string().min(13).max(13).optional(),
});

export const loginValidation = z.object({
  email:z.string().email(),
  password:z.string().min(4)
})