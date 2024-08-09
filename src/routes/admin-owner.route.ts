import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { adminOwnerValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get(
  "/admin-owner",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAll(
        {
          include: {
            admin: true,
            owner: true,
          },
        },
        prisma.adminOwner
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/admin-owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            admin: true,
            owner: true,
          },
        },
        prisma.adminOwner
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/admin-owner",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        adminOwnerValidation,
        prisma.adminOwner
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/admin-owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        adminOwnerValidation,
        prisma.adminOwner
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/admin-owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.adminOwner);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
