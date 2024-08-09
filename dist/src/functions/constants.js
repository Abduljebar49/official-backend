"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespData = exports.NoDataFound = void 0;
const NoDataFound = (res, message = "No data found with given id") => {
    return res.status(404).send({ message, success: false });
};
exports.NoDataFound = NoDataFound;
const RespData = (res, data = [], message = "success") => {
    return res.status(200).send({ data, message, success: true });
};
exports.RespData = RespData;
