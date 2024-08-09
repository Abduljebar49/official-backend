import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details = undefined;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    details = err.message;
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized";
  }

  console.error(`Error: ${message}\nStatus: ${statusCode}\nDetails: ${details || err.stack}`);

  res.status(statusCode).json({
    message,
    ...(details && { details }),
  });
};

export { errorHandler, CustomError };
