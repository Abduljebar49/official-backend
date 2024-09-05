"use strict";
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
const core_1 = require("../controllers/core");
const clients_1 = __importDefault(require("../../prisma/clients"));
const constants_1 = require("../functions/constants");
const validators_1 = require("../functions/validators");
const route = express_1.default.Router();
route.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, core_1.getAll)({}, clients_1.default.course);
    (0, constants_1.RespData)(res, data);
}));
route.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, core_1.getOne)({ id: req.params.id }, clients_1.default.course);
    (0, constants_1.RespData)(res, data);
}));
route.post("/", constants_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, core_1.createWithIdValidation)(req, res, next, validators_1.courseSchema, clients_1.default.course);
}));
route.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, core_1.updateWithIdValidation)(req, res, next, validators_1.courseEditSchema, clients_1.default.course);
}));
route.delete("//:id", (req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, core_1.deleteOne)(req.params.id, clients_1.default.course);
        (0, constants_1.RespData)(res, data);
    }
    catch (error) {
        res.send({ message: error.message, success: false });
    }
}));
exports.default = route;
