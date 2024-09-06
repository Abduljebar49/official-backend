import { NextFunction, Request, Response } from "express";
import { baseUrl, NoDataFound, RespData } from "../functions/constants";
import { ZodSchema } from "zod";
import * as bcrypt from "bcrypt";

export const withErrorHandling = (
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    validation?: ZodSchema,
    model?: any
  ) => Promise<any>
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
    validation?: ZodSchema,
    model?: any
  ) => {
    try {
      return await handler(req, res, next, validation, model);
    } catch (error: any) {
      next(error);
    }
  };
};

export const getOne = async (where: any, model: any) => {
  try {
    const data = await model.findUnique({ where: where });
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getOneWithEmail = async (email: string, model: any) => {
  try {
    const data = await model.findUnique({ where: { email } });
    return data;
  } catch (e: any) {
    console.log("e : ", e);
    throw new Error(e.message);
  }
};

export const getOneWithId = async (id: string, model: any) => {
  try {
    const data = await model.findUnique({ where: { id } });
    return data;
  } catch (e: any) {
    console.log("e : ", e);
    throw new Error(e.message);
  }
};

export const createOne = async (body: any, model: any) => {
  try {
    const data = await model.create({ data: body });
    return data;
  } catch (e: any) {
    console.log("e : ",e);
    throw new Error(e.message);
  }
};

export const deleteOne = async (id: string, model: any) => {
  const data = await model.delete({ where: { id } });
  return data;
};

export const updateOne = async (body: any, model: any) => {
  const data = await model.update({ where: { id: body.id }, data: body });
  return data;
};

export const getAll = async (where: any, model: any) => {
  const data = await model.findMany({ where: where });
  return data;
};

const createWithIdValidationCore = async (
  req: Request,
  res: Response,
  _: NextFunction,
  validation: ZodSchema,
  model: any
) => {
  const body = req.body;

  if (req.file) {
    const url = baseUrl + "courses/" + req.file?.filename;
    body.image = url;
  }

  if(body.price){
    body.price = parseInt(body.price);
  }

  const data = validation.safeParse(body);
  if (data.error) {
    console.log(data.error);
    res.status(400).send({ message: data.error, success: false });
    return;
  } else {
    if (body.email) {
      const modelData = await getOneWithEmail(body.email, model);
      if (modelData) {
        NoDataFound(res, "Email already exist");
        return;
      }
    }
    if (body.password) {
      const salt = await bcrypt.genSaltSync(10, "a");
      body.password = bcrypt.hashSync(body.password, salt);
    }
    const newModelData = await createOne(body, model);
    if (!newModelData) {
      return RespData(res, [], "There is an error in server");
    }
    if (newModelData.password) {
      newModelData.password = undefined;
    }
    return RespData(res, newModelData);
  }
};

const updateWithIdValidationCore = async (
  req: Request,
  res: Response,
  _: NextFunction,
  validation: ZodSchema,
  model: any
) => {
  const body = req.body;
  if (req.file) {
    const url = baseUrl + "courses/" + req.file?.filename;
    body.image = url;
  }

  const data = validation.safeParse(body);

  if (data.error) {
    console.log(data.error);
    res.status(400).send({ message: data.error, success: false });
    return;
  } else {
    if (!req.params.id) {
      res.status(400).send({ message: "id is required", success: false });
      return;
    }
    if (body.password) {
      body.password = undefined;
    }
    body.id = req.params.id;
    const modelData = await getOneWithId(req.params.id, model);
    if (!modelData) {
      NoDataFound(res, "No data with given ID");
      return;
    }
    const newModelData = await updateOne(body, model);
    if (!newModelData) {
      return RespData(res, [], "There is an error in server");
    }
    return RespData(res, newModelData);
  }
};

const createWithValidationCore = async (
  req: Request,
  res: Response,
  next: NextFunction,
  validation: ZodSchema,
  model: any
) => {
  try {
    const body = req.body;
    const data = validation.safeParse(body);
    if (data.error) {
      return res
        .status(400)
        .send({ message: data.error.message, success: false });
    }
    const modelData = await createOne(body, model);
    RespData(res, modelData);
  } catch (e: any) {
    next(e);
  }
};

export const updateWithIdValidation = withErrorHandling(
  async (req, res, next, validation, model) => {
    return await updateWithIdValidationCore(
      req,
      res,
      next,
      validation!,
      model!
    );
  }
);

export const createWithIdValidation = withErrorHandling(
  async (req, res, next, validation, model) => {
    return await createWithIdValidationCore(
      req,
      res,
      next,
      validation!,
      model!
    );
  }
);

export const createWithValidation = withErrorHandling(
  (req, res, next, validation, model) =>
    createWithValidationCore(req, res, next, validation!, model!)
);
