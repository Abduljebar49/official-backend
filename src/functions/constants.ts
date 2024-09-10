import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const NoDataFound = (
  res: Response,
  message: string = "No data found with given id"
) => {
  return res.status(404).send({ message, success: false });
};

export const RespData = (
  res: Response,
  data: any = [],
  message: string = "success",
  status: number = 200,
  success: boolean = true
) => {
  return res.status(status).send({ data, message, success });
};


export const generateAccessToken = (user:any)=> {
  return jwt.sign(
    JSON.parse(JSON.stringify(user)),
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );
}

export const editGeneratedAccessToken = (authHeader:string,) =>{
  return jwt.sign(
    authHeader,
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1s" },  );
}

export function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}


export enum RStatus{
  SUCCESS="successfully fetched",
  CREATED="successfully created",
  UPDATED="successfully updated",
  DELETED="successfully deleted"
}