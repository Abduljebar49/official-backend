import express, { Express, NextFunction, Request, Response } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import {
  userEditSchema,
  userSchema,
} from "../functions/validators";
import {
  RespData,
} from "../functions/constants";

const router = express.Router();

router.get("/user", async (_: Request, res: Response, next: Function) => {
  const data = await getAll({}, prisma.user);
  RespData(res, data);
});

router.get("/user/:id", async (req: Request, res: Response, next: Function) => {
  const data = await getOne({ id: req.params.id }, prisma.user);
  RespData(res, data);
});

router.post(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    return await createWithIdValidation(
      req,
      res,
      next,
      userSchema,
      prisma.user
    );
  }
);

router.put(
  "/user/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return await updateWithIdValidation(
      req,
      res,
      next,
      userEditSchema,
      prisma.user
    );
  }
);

router.delete("/user/:id", async (req: Request, res: Response, _: Function) => {
  try {
    const data = await deleteOne(req.params.id, prisma.user);
    RespData(res, data);
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});


export default router;
