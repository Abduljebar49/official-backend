import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(13),
  fullName: z.string().min(4),
  phone: z.string().min(13).max(13).optional(),
  userType: z.enum(["ADMIN", "IMPORTER", "DISTRIBUTOR", "SALESPERSON"]),
});

export const userEditSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(4),
  phone: z.string().min(13).max(13).optional(),
  userType: z.enum(["ADMIN", "IMPORTER", "DISTRIBUTOR", "SALESPERSON"]),
});
export const loginValidation = z.object({
  email:z.string().email(),
  password:z.string().min(4)
})
export const requestSchema = z.object({
  itemName: z.string(),
  brandName: z.string(),
  amount: z.number(),
  userId: z.number(),
});
export const sendEmailSchema = z.object({});
export const requestEditSchema = z.object({
  itemName: z.string().optional(),
  brandName: z.string().optional(),
  amount: z.number().optional(),
  userId: z.number().optional(),
});
