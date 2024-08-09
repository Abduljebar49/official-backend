import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { roleValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get("/role", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAll(
      {
        include: {
          adminRoles: true,
          rolePermissions: true,
        },
      },
      prisma.role
    );
    RespData(res, data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            adminRoles: true,
            rolePermissions: true,
          },
        },
        prisma.role
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/role",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        roleValidation,
        prisma.role
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        roleValidation,
        prisma.role
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.role);
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
