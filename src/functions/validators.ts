import { z } from "zod";

export const adminValidation = z.object({
  id: z.number().int().positive().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string().min(1, "Password hash is required"),
});

export type Admin = z.infer<typeof adminValidation>;

export const ownerValidation = z.object({
  id: z.number().int().positive().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string().min(1, "Password hash is required"),
});

export type Owner = z.infer<typeof ownerValidation>;

export const inventoryLocationValidation = z.object({
  id: z.number().int().positive().optional(),
  ownerId: z.number().int().positive(),
  locationName: z.string().min(1, "Location name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  assignedAdminId: z.number().int().positive().nullable().optional(),
});

export type InventoryLocation = z.infer<typeof inventoryLocationValidation>;

export const productValidation = z.object({
  id: z.number().int().positive().optional(),
  productName: z.string().min(1, "Product name is required"),
  description: z.string().nullable().optional(),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantityInStock: z.number().int().nonnegative("Quantity in stock must be a non-negative integer"),
  locationId: z.number().int().positive(),
});

export type Product = z.infer<typeof productValidation>;

export const adminOwnerValidation = z.object({
  id: z.number().int().positive().optional(),
  adminId: z.number().int().positive(),
  ownerId: z.number().int().positive(),
});

export type AdminOwner = z.infer<typeof adminOwnerValidation>;

export const roleValidation = z.object({
  id: z.number().int().positive().optional(),
  roleName: z.string().min(1, "Role name is required"),
});

export type Role = z.infer<typeof roleValidation>;

export const permissionValidation = z.object({
  id: z.number().int().positive().optional(),
  permissionName: z.string().min(1, "Permission name is required"),
});

export type Permission = z.infer<typeof permissionValidation>;

export const adminRoleValidation = z.object({
  id: z.number().int().positive().optional(),
  adminId: z.number().int().positive(),
  roleId: z.number().int().positive(),
});

export type AdminRole = z.infer<typeof adminRoleValidation>;

export const rolePermissionValidation = z.object({
  id: z.number().int().positive().optional(),
  roleId: z.number().int().positive(),
  permissionId: z.number().int().positive(),
});

export type RolePermission = z.infer<typeof rolePermissionValidation>;
 

// export const AccountValidation = z.object({
//   objId: z.string().uuid().optional(),
//   name: z.string(),
//   ownerId: z.string().uuid().nullable().optional(),
//   subscriptionId: z.string().uuid(),
// });

// export type Account = z.infer<typeof AccountValidation>;

// export const ProductDataValidation = z.object({
//   id: z.string().uuid().optional(),
//   branchId: z.string().uuid(),
//   objId: z.string().uuid(),
//   name: z.string(),
//   model: z.string(),
//   color: z.string(),
//   size: z.string(),
//   price: z.number(),
//   col1: z.string().nullable().optional(),
//   col2: z.string().nullable().optional(),
//   col3: z.string().nullable().optional(),
//   col4: z.string().nullable().optional(),
//   quantity: z.number(),
//   quantityRegistered: z.number(),
//   check: z.string().optional().default(""),
//   isActive: z.boolean().optional().default(true),
// });

// export type ProductData = z.infer<typeof ProductDataValidation>;

// export const BranchTypeValidation = z.object({
//   id: z.string().uuid().optional(),
//   name: z.string(),
//   model: z.string(),
//   color: z.string(),
//   size: z.string(),
//   col1: z.string().nullable().optional(),
//   col2: z.string().nullable().optional(),
//   col3: z.string().nullable().optional(),
//   col4: z.string().nullable().optional(),
//   limit: z.number().optional().default(4),
//   type: z.string(),
// });

// export type BranchType = z.infer<typeof BranchTypeValidation>;

// export const BranchValidation = z.object({
//   id: z.string().uuid().optional(),
//   name: z.string(),
//   type: z.string(),
//   objId: z.string().uuid(),
// });

// export type Branch = z.infer<typeof BranchValidation>;

// const BaseReportValidation = z.object({
//   id: z.string().uuid().optional(),
//   branchId: z.string().uuid(),
//   objId: z.string().uuid(),
//   name: z.string(),
//   model: z.string(),
//   color: z.string(),
//   size: z.string(),
//   price: z.number(),
//   col1: z.string().nullable().optional(),
//   col2: z.string().nullable().optional(),
//   col3: z.string().nullable().optional(),
//   col4: z.string().nullable().optional(),
//   quantity: z.number(),
//   quantityRegistered: z.number(),
//   check: z.string().optional().default(""),
//   isActive: z.boolean().optional().default(true),
// });

// export const MoveReportValidation = BaseReportValidation;
// export const RegisterReportValidation = BaseReportValidation;
// export const SoldReportValidation = BaseReportValidation;
// export const ReturnReportValidation = BaseReportValidation;

// export type MoveReport = z.infer<typeof MoveReportValidation>;
// export type RegisterReport = z.infer<typeof RegisterReportValidation>;
// export type SoldReport = z.infer<typeof SoldReportValidation>;
// export type ReturnReport = z.infer<typeof ReturnReportValidation>;

// export const SubscriptionValidation = z.object({
//   id: z.string().uuid().optional(),
//   title: z.string(),
//   branchLimit: z.number(),
// });

// export type Subscription = z.infer<typeof SubscriptionValidation>;

// export const SuperUserValidation = z.object({
//   id: z.string().uuid().optional(),
//   displayName: z.string(),
//   email: z.string().email(),
//   phone: z.string(),
//   password: z.string().min(8),
// });

// export type SuperUser = z.infer<typeof SuperUserValidation>;

// export const UserValidation = z.object({
//   id: z.string().uuid().optional(),
//   displayName: z.string(),
//   email: z.string().email(),
//   gender: z.string(),
//   name: z.string(),
//   objId: z.string().uuid(),
//   phone: z.string(),
//   role: z.string(),
//   password: z.string().min(8),
//   branches: z.string().nullable().optional(),
//   roles: z.string().nullable().optional(),
// });

// export type User = z.infer<typeof UserValidation>;
