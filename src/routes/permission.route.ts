import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { permissionValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get(
  "/permission",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAll(
        {
          include: {
            rolePermissions: true,
          },
        },
        prisma.permission
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            rolePermissions: true,
          },
        },
        prisma.permission
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/permission",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        permissionValidation,
        prisma.permission
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        permissionValidation,
        prisma.permission
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.permission);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
