"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = __importDefault(require("./admin.route"));
const admin_role_route_1 = __importDefault(require("./admin-role.route"));
const admin_owner_route_1 = __importDefault(require("./admin-owner.route"));
const inventory_location_route_1 = __importDefault(require("./inventory-location.route"));
const product_route_1 = __importDefault(require("./product.route"));
const owner_route_1 = __importDefault(require("./owner.route"));
const role_route_1 = __importDefault(require("./role.route"));
const role_permission_route_1 = __importDefault(require("./role-permission.route"));
const permission_route_1 = __importDefault(require("./permission.route"));
const router = express_1.default.Router();
router.use(admin_route_1.default);
router.use(admin_role_route_1.default);
router.use(admin_owner_route_1.default);
router.use(product_route_1.default);
router.use(inventory_location_route_1.default);
router.use(owner_route_1.default);
router.use(role_route_1.default);
router.use(role_permission_route_1.default);
router.use(permission_route_1.default);
router.get("/welcome", (_, res) => {
    res.status(400).json({ message: "hello" });
});
exports.default = router;
