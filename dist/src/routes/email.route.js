"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_controller_1 = require("../controllers/email.controller");
const router = express_1.default.Router();
router.post("/welcome", email_controller_1.sendWelcomeEmail);
router.post("/link", email_controller_1.sendLinkEmail);
exports.default = router;
