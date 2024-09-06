"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RStatus = exports.editGeneratedAccessToken = exports.generateAccessToken = exports.RespData = exports.NoDataFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NoDataFound = (res, message = "No data found with given id") => {
    return res.status(404).send({ message, success: false });
};
exports.NoDataFound = NoDataFound;
const RespData = (res, data = [], message = "success", status = 200) => {
    return res.status(status).send({ data, message, success: true });
};
exports.RespData = RespData;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(user)), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};
exports.generateAccessToken = generateAccessToken;
const editGeneratedAccessToken = (authHeader) => {
    return jsonwebtoken_1.default.sign(authHeader, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1s" });
};
exports.editGeneratedAccessToken = editGeneratedAccessToken;
var RStatus;
(function (RStatus) {
    RStatus["SUCCESS"] = "successfully fetched";
    RStatus["CREATED"] = "successfully created";
    RStatus["UPDATED"] = "successfully updated";
    RStatus["DELETED"] = "successfully deleted";
})(RStatus || (exports.RStatus = RStatus = {}));
