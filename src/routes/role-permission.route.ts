import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { rolePermissionValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get(
  "/role-permission",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAll(
        {
          include: {
            role: true,
            permission: true, 
          },
        },
        prisma.rolePermission
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/role-permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
          {
            id: req.params.id,
            include: {
              role: true,
              permission: true, 
            },
          }
        ,
        prisma.rolePermission,
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/role-permission",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        rolePermissionValidation,
        prisma.rolePermission
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/role-permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        rolePermissionValidation,
        prisma.rolePermission
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/role-permission/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.rolePermission);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
