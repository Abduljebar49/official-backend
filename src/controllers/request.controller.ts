import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { RespData } from "../functions/constants";
import { requestSchema } from "../functions/validators";
import { createMultiple, withErrorHandling } from "./core";

const createMultipleRequestCore = async (
  req: Request,
  res: Response,
  _: NextFunction,
  validation: ZodSchema,
  model: any
) => {
  const { requests } = req.body();

  if (!Array.isArray(requests)) {
    return RespData(res, [], "Invalid data format. Expected an array.", 401);
  }

  const isValidEntries = requests.every(
    (entry) => requestSchema.safeParse(entry).success
  );
  if (!isValidEntries) {
    return RespData(
      res,
      isValidEntries,
      "Some entries have invalid formats.",
      401
    );
  }

  const newModelData = await createMultiple(requests, model);
  if (!newModelData) {
    return RespData(res, [], "There is an error in server");
  }
  return RespData(res, newModelData);
};

export const createMultipleRequest = withErrorHandling(
  async (req, res, next, validation, model) => {
    return await createMultipleRequestCore(req, res, next, validation!, model!);
  }
);
