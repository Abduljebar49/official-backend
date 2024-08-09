import express from "express";
import admin from "./admin.route";
import adminRole from "./admin-role.route";
import adminOwner from "./admin-owner.route";
import inventoryLocation from "./inventory-location.route"
import product from "./product.route"
import owner from "./owner.route"
import role from "./role.route";
import rolePermission from "./role-permission.route";
import permission from "./permission.route";



const router = express.Router();

router.use(admin);
router.use(adminRole);
router.use(adminOwner);
router.use(product);
router.use(inventoryLocation);
router.use(owner)
router.use(role);
router.use(rolePermission);
router.use(permission);


router.get("/welcome", (_: any, res: any) => {
  res.status(400).json({ message: "hello" });
});

export default router;
