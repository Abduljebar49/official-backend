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
exports.createWithValidation = exports.createWithIdValidation = exports.updateWithIdValidation = exports.getAll = exports.updateOne = exports.deleteOne = exports.createOne = exports.getOneWithEmail = exports.getOne = exports.withErrorHandling = void 0;
const constants_1 = require("../functions/constants");
const withErrorHandling = (handler) => {
    return (req, res, next, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield handler(req, res, next, validation, model);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.withErrorHandling = withErrorHandling;
const getOne = (id, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("rose1");
        const data = yield model.findUnique({ where: { id: id } });
        console.log("rose2");
        return data;
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.getOne = getOne;
const getOneWithEmail = (email, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model.findUnique({ where: { email: email } });
        return data;
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.getOneWithEmail = getOneWithEmail;
const createOne = (body, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model.create({ data: body });
        return data;
    }
    catch (e) {
        return undefined;
    }
});
exports.createOne = createOne;
const deleteOne = (id, model) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.delete({ where: { id } });
    return data;
});
exports.deleteOne = deleteOne;
const updateOne = (body, model) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.update({ where: { id: body.id }, data: body });
    return data;
});
exports.updateOne = updateOne;
const getAll = (where, model) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.findMany({ where: where });
    return data;
});
exports.getAll = getAll;
const createWithIdValidationCore = (req, res, _, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = validation.safeParse(body);
    if (data.error) {
        console.log(data.error);
        res.status(400).send({ message: data.error.message, success: false });
        return;
    }
    else {
        console.log("data : ", body.email);
        const modelData = yield (0, exports.getOneWithEmail)(body.email, model);
        if (modelData) {
            (0, constants_1.NoDataFound)(res, "Email already exist");
            return;
        }
        const newModelData = yield (0, exports.createOne)(body, model);
        if (!newModelData) {
            return (0, constants_1.RespData)(res, [], "There is an error in server");
        }
        return (0, constants_1.RespData)(res, newModelData);
    }
});
const updateWithIdValidationCore = (req, res, _, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = validation.safeParse(body);
    if (data.error) {
        console.log(data.error);
        res.status(400).send({ message: data.error.message, success: false });
        return;
    }
    else {
        if (!body.id) {
            res.status(400).send({ message: "id is required", success: false });
            return;
        }
        if (body.password) {
            body.password = undefined;
        }
        console.log("body : ", body);
        const modelData = yield (0, exports.getOneWithEmail)(body.email, model);
        if (!modelData) {
            (0, constants_1.NoDataFound)(res, "No data with given ID");
            return;
        }
        const newModelData = yield (0, exports.updateOne)(body, model);
        if (!newModelData) {
            return (0, constants_1.RespData)(res, [], "There is an error in server");
        }
        return (0, constants_1.RespData)(res, newModelData);
    }
});
const createWithValidationCore = (req, res, next, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = validation.safeParse(body);
        if (data.error) {
            return res
                .status(400)
                .send({ message: data.error.message, success: false });
        }
        const modelData = yield (0, exports.createOne)(body, model);
        (0, constants_1.RespData)(res, modelData);
    }
    catch (e) {
        next(e);
    }
});
exports.updateWithIdValidation = (0, exports.withErrorHandling)((req, res, next, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    return yield updateWithIdValidationCore(req, res, next, validation, model);
}));
exports.createWithIdValidation = (0, exports.withErrorHandling)((req, res, next, validation, model) => __awaiter(void 0, void 0, void 0, function* () {
    return yield createWithIdValidationCore(req, res, next, validation, model);
}));
exports.createWithValidation = (0, exports.withErrorHandling)((req, res, next, validation, model) => createWithValidationCore(req, res, next, validation, model));
