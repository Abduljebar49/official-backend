import express, { Request, Response, NextFunction } from "express";
import {
  createWithIdValidation,
  deleteOne,
  getAll,
  getOne,
  updateWithIdValidation,
} from "../controllers/core";
import prisma from "../../prisma/clients";
import { ownerValidation } from "../functions/validators";
import { RespData } from "../functions/constants";

const router = express.Router();

router.get("/owner", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAll(
      {
        include: {
          inventoryLocations: true,
          adminOwners: true,
        },
      },
      prisma.owner
    );
    RespData(res, data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getOne(
        {
          id: req.params.id,
          include: {
            inventoryLocations: true,
            adminOwners: true,
          },
        },
        prisma.owner
      );
      RespData(res, data);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/owner",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await createWithIdValidation(
        req,
        res,
        next,
        ownerValidation,
        prisma.owner
      );
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await updateWithIdValidation(
        req,
        res,
        next,
        ownerValidation,
        prisma.owner
      );
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/owner/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteOne(req.params.id, prisma.owner);
      RespData(res, data);
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

export default router;
