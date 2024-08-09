import express, { Request, Response, NextFunction } from "express";
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

router.get("/admin-role", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAll(
      {
        include: {
          assignedLocations: true,
          adminOwners: true,
          adminRoles: true,
        },
      },
      prisma.admin
    );
    RespData(res, data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/admin-role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            assignedLocations: true,
            adminOwners: true,
            adminRoles: true,
          },
        },
        prisma.admin
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/admin-role",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        adminValidation,
        prisma.admin
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/admin-role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        adminValidation,
        prisma.admin
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/admin-role/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.admin);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
