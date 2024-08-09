import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { productValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get(
  "/product",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAll(
        {
          include: {
            inventoryLocation: true,
          },
        },
        prisma.product
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            inventoryLocation: true,
          },
        },
        prisma.product
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        productValidation,
        prisma.product
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        productValidation,
        prisma.product
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/product/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.product);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
