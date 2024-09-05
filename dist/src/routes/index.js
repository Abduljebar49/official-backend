"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const account_route_1 = __importDefault(require("./account.route"));
const course_route_1 = __importDefault(require("./course.route"));
const router = express_1.default.Router();
router.use("/users", user_route_1.default);
router.use(account_route_1.default);
router.use('/courses', course_route_1.default);
exports.default = router;
