import express, { NextFunction, Request, Response } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { RespData, upload } from "../functions/constants";
import { courseEditSchema, courseSchema } from "../functions/validators";

const route = express.Router();

route.get("/", async (_: Request, res: Response) => {
  const data = await getAll({}, prisma.course);
  RespData(res, data);
});

route.get("/:id", async (req: Request, res: Response, next: Function) => {
  const data = await getOne({ id: req.params.id }, prisma.course);
  RespData(res, data);
});

route.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    return await createWithIdValidation(
      req,
      res,
      next,
      courseSchema,
      prisma.course
    );
  }
);

route.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  return await updateWithIdValidation(
    req,
    res,
    next,
    courseEditSchema,
    prisma.course
  );
});

route.delete("//:id", async (req: Request, res: Response, _: Function) => {
  try {
    const data = await deleteOne(req.params.id, prisma.course);
    RespData(res, data);
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});

export default route;
