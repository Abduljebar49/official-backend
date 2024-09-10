import express, { NextFunction, Request, Response } from "express";

import prisma from "../../prisma/clients";
import { RespData } from "../functions/constants";
import { requestSchema } from "../functions/validators";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import { createMultipleRequest, getGroupedRequests } from "../controllers/request.controller";

const tag = "requests";

const router = express.Router();

router.get("", async (_: Request, res: Response, next: Function) => {
  const data = await getAll({}, prisma.request);
  RespData(res, data);
});

router.get("/:id", async (req: Request, res: Response, next: Function) => {
  const data = await getOne({ id: req.params.id }, prisma.request);
  RespData(res, data);
});

router.get("/by/group", getGroupedRequests);

router.post("", async (req: Request, res: Response, next: NextFunction) => {
  return await createWithIdValidation(req, res, next, requestSchema, prisma.request);
});

router.post("/multi", async (req: Request, res: Response, next: NextFunction) => {
  return await createMultipleRequest(req, res, next, requestSchema, prisma.request);
})

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  return await updateWithIdValidation(
    req,
    res,
    next,
    requestSchema,
    prisma.request
  );
});

router.delete("/:id", async (req: Request, res: Response, _: Function) => {
  try {
    const data = await deleteOne(req.params.id, prisma.request);
    RespData(res, data);
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});

export default router;