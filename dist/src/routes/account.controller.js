"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validators_1 = require("../functions/validators");
const core_1 = require("../controllers/core");
const clients_1 = __importDefault(require("../../prisma/clients"));
const constants_1 = require("../functions/constants");
const router = express_1.default.Router();
router.post("/auth/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = validators_1.loginValidation.safeParse(body);
        if (data.error) {
            res.status(400).send({ message: data.error.message, success: false });
            return;
        }
        const modelData = yield (0, core_1.getOneWithEmail)(body.email, clients_1.default.user);
        if (!modelData) {
            (0, constants_1.NoDataFound)(res, "email or password incorrect.");
            return;
        }
        if (!bcrypt.compareSync(body.password, modelData.password)) {
            (0, constants_1.NoDataFound)(res, "email or password incorrect.");
            return;
        }
        const accessToken = (0, constants_1.generateAccessToken)({
            email: modelData.email,
            fullName: modelData.fullName,
        });
        (0, constants_1.RespData)(res, { accessToken, data: modelData });
    }
    catch (error) {
        res.send({ message: error.message, success: false });
    }
}));
router.post("/auth/logout", (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jsonwebtoken_1.default.sign(token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1s" }, (err, logoutToken) => {
            if (err) {
                res.status(500).send({ msg: "Error", success: false });
                return;
            }
            else if (logoutToken) {
                res.send({ msg: "You have been logged out", success: true });
                return;
            }
        });
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;
