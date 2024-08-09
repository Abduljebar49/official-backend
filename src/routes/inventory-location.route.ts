import express, { NextFunction, Request, Response } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { inventoryLocationValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get(
  "/inventory-location",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAll(
        {
          include: {
            owner: true,
            assignedAdmin: true,
            products: true,
          },
        },
        prisma.inventoryLocation
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/inventory-location/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            owner: true,
            assignedAdmin: true,
            products: true,
          },
        },
        prisma.inventoryLocation
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/inventory-location",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        inventoryLocationValidation,
        prisma.inventoryLocation
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/inventory-location/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        inventoryLocationValidation,
        prisma.inventoryLocation
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/inventory-location/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.inventoryLocation);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
