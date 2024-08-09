import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodObjectDef, ZodSchema } from "zod";
import { createOne, getOne } from "./core";
import prisma from "../../prisma/clients";
import { NoDataFound, RespData } from "../functions/constants";



export const getAllAccount = (

)=>{
    
}

export const SuperFunction = async (
  req: Request,
  res: Response
) => {
  try {

    
  } catch (e: any) {
    res.status(400).send({ message: e.message, success: false });
  }
};
