"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.errorHandler = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let details = undefined;
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
        details = err.details;
    }
    else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error";
        details = err.message;
    }
    else if (err.name === "UnauthorizedError") {
        statusCode = 401;
        message = "Unauthorized";
    }
    console.error(`Error: ${message}\nStatus: ${statusCode}\nDetails: ${details || err.stack}`);
    res.status(statusCode).json(Object.assign({ message }, (details && { details })));
};
exports.errorHandler = errorHandler;
