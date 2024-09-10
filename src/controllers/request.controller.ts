import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { RespData } from "../functions/constants";
import { requestSchema } from "../functions/validators";
import { createMultiple, withErrorHandling } from "./core";
import prisma from "../../prisma/clients";

const createMultipleRequestCore = async (
  req: Request,
  res: Response,
  _: NextFunction,
  validation: ZodSchema,
  model: any
) => {
  const { requests } = req.body;

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
    return RespData(res, [], "There is an error in server", 200, false);
  }
  return RespData(res, newModelData);
};

export const getGroupedRequests = async (req: Request, res: Response) => {
  try {
    const groupedRequests = await prisma.request.groupBy({
      by: ["groupId"],
    });
    const groupedData = await Promise.all(
      groupedRequests.map(async (group) => {
        const requests = await prisma.request.findMany({
          where: {
            groupId: group.groupId,
            isRequested: false,
          },
        });
        return {
          groupId: group.groupId,
          requests,
        };
      })
    );
    res.status(200).json(groupedData);
  } catch (error) {
    console.error("Error fetching grouped requests:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createMultipleRequest = withErrorHandling(
  async (req, res, next, validation, model) => {
    return await createMultipleRequestCore(req, res, next, validation!, model!);
  }
);
