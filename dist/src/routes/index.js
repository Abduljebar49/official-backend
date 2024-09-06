"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const router = express_1.default.Router();
router.use("/users", user_route_1.default);
// router.use(accountRoute);
// router.use("/requests", requestRoute);
// router.use("/send",emailRoute);
exports.default = router;
