"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissionValidation = exports.adminRoleValidation = exports.permissionValidation = exports.roleValidation = exports.adminOwnerValidation = exports.productValidation = exports.inventoryLocationValidation = exports.ownerValidation = exports.adminValidation = void 0;
const zod_1 = require("zod");
exports.adminValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    passwordHash: zod_1.z.string().min(1, "Password hash is required"),
});
exports.ownerValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    passwordHash: zod_1.z.string().min(1, "Password hash is required"),
});
exports.inventoryLocationValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    ownerId: zod_1.z.number().int().positive(),
    locationName: zod_1.z.string().min(1, "Location name is required"),
    address: zod_1.z.string().min(1, "Address is required"),
    phoneNumber: zod_1.z.string().min(1, "Phone number is required"),
    assignedAdminId: zod_1.z.number().int().positive().nullable().optional(),
});
exports.productValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    productName: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().nullable().optional(),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    quantityInStock: zod_1.z.number().int().nonnegative("Quantity in stock must be a non-negative integer"),
    locationId: zod_1.z.number().int().positive(),
});
exports.adminOwnerValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    adminId: zod_1.z.number().int().positive(),
    ownerId: zod_1.z.number().int().positive(),
});
exports.roleValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    roleName: zod_1.z.string().min(1, "Role name is required"),
});
exports.permissionValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    permissionName: zod_1.z.string().min(1, "Permission name is required"),
});
exports.adminRoleValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    adminId: zod_1.z.number().int().positive(),
    roleId: zod_1.z.number().int().positive(),
});
exports.rolePermissionValidation = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    roleId: zod_1.z.number().int().positive(),
    permissionId: zod_1.z.number().int().positive(),
});
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
