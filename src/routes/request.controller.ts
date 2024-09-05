import express, { NextFunction, Request, Response } from "express";

import prisma from "../../prisma/clients";
import { RespData } from "../functions/constants";
import { userEditSchema, userSchema } from "../functions/validators";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";

const tag = "requests";

const router = express.Router();

router.get("", async (_: Request, res: Response, next: Function) => {
  const data = await getAll({}, prisma.user);
  RespData(res, data);
});

router.get("/:id", async (req: Request, res: Response, next: Function) => {
  const data = await getOne({ id: req.params.id }, prisma.user);
  RespData(res, data);
});

router.post("", async (req: Request, res: Response, next: NextFunction) => {
  return await createWithIdValidation(req, res, next, userSchema, prisma.user);
});

router.post("/multi", async (req: Request, res: Response, next: NextFunction) => {
  return await createWithIdValidation(req, res, next, userSchema, prisma.user);
})

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  return await updateWithIdValidation(
    req,
    res,
    next,
    userEditSchema,
    prisma.user
  );
});

router.delete("/:id", async (req: Request, res: Response, _: Function) => {
  try {
    const data = await deleteOne(req.params.id, prisma.user);
    RespData(res, data);
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});

export default router;
