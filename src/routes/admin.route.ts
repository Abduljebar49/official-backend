import express, { Express, NextFunction, Request, Response } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { adminValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get("/admin", async (_: Request, res: Response, next: Function) => {
  const data = await getAll({}, prisma.admin);
  RespData(res, data);
});

router.get(
  "/admin/:id",
  async (req: Request, res: Response, next: Function) => {
    const data = await getOne({id:req.params.id}, prisma.admin);
    RespData(res, data);
  }
);

router.post(
  "/admin",
  async (req: Request, res: Response, next: NextFunction) => {
    return await createWithIdValidation(
      req,
      res,
      next,
      adminValidation,
      prisma.admin
    );
  }
);

router.put(
  "/admin/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return await updateWithIdValidation(
      req,
      res,
      next,
      adminValidation,
      prisma.admin
    );
  }
);

router.delete(
  "/admin/:id",
  async (req: Request, res: Response, _: Function) => {
    try {
      const data = await deleteOne(req.params.id, prisma.admin);
      RespData(res, data);
    } catch (error:any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;