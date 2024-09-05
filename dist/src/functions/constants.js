"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.editGeneratedAccessToken = exports.generateAccessToken = exports.RespData = exports.NoDataFound = exports.baseUrl = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
exports.baseUrl = "http://localhost:3001/";
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
    return jsonwebtoken_1.default.sign(authHeader, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1s",
    });
};
exports.editGeneratedAccessToken = editGeneratedAccessToken;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "../../../../public/courses");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log("file :", file);
        cb(null, file.fieldname +
            "-" +
            uniqueSuffix +
            "." +
            file.originalname.split(".")[1]);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
