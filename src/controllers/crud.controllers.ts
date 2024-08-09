import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/clients";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) => {
  const data = await model.findMany();
};

