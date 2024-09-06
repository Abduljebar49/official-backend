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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMultipleRequest = void 0;
const constants_1 = require("../functions/constants");
const validators_1 = require("../functions/validators");
const core_1 = require("./core");
const createMultipleRequestCore = (req, res, _, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    const { requests } = req.body();
    if (!Array.isArray(requests)) {
        return (0, constants_1.RespData)(res, [], "Invalid data format. Expected an array.", 401);
    }
    const isValidEntries = requests.every((entry) => validators_1.requestSchema.safeParse(entry).success);
    if (!isValidEntries) {
        return (0, constants_1.RespData)(res, isValidEntries, "Some entries have invalid formats.", 401);
    }
    const newModelData = yield (0, core_1.createMultiple)(requests, model);
    if (!newModelData) {
        return (0, constants_1.RespData)(res, [], "There is an error in server");
    }
    return (0, constants_1.RespData)(res, newModelData);
});
exports.createMultipleRequest = (0, core_1.withErrorHandling)((req, res, next, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    return yield createMultipleRequestCore(req, res, next, validation, model);
}));
