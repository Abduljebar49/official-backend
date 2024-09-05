
import express, {NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginValidation } from "../functions/validators";
import { getOneWithEmail } from "../controllers/core";
import prisma from "../../prisma/clients";
import { generateAccessToken, NoDataFound, RespData } from "../functions/constants";


const router = express.Router();

router.post(
    "/auth/login",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = req.body;
        const data = loginValidation.safeParse(body);
        if (data.error) {
          res.status(400).send({ message: data.error.message, success: false });
          return;
        }
  
        const modelData = await getOneWithEmail(body.email, prisma.user);
        if (!modelData) {
          NoDataFound(res, "email or password incorrect.");
          return;
        }
  
        if (!bcrypt.compareSync(body.password, modelData.password)) {
          NoDataFound(res, "email or password incorrect.");
          return;
        }
        const accessToken = generateAccessToken({
          email: modelData.email,
          fullName: modelData.fullName,
        });
        RespData(res, { accessToken, data: modelData });
      } catch (error: any) {
        res.send({ message: error.message, success: false });
      }
    }
  );
  
  router.post(
    "/auth/logout",
    (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.sign(
          token,
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "1s" },
          (err, logoutToken) => {
            if (err) {
              res.status(500).send({ msg: "Error", success: false });
              return;
            } else if (logoutToken) {
              res.send({ msg: "You have been logged out", success: true });
              return;
            }
          }
        );
      } else {
        res.sendStatus(404);
      }
    }
  );

export default router;