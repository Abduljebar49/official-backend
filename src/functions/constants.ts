import { Response } from "express";

export const NoDataFound = (
  res: Response,
  message: string = "No data found with given id"
) => {
  return res.status(404).send({ message, success: false });
};

export const RespData = (
  res: Response,
  data: any = [],
  message: string = "success"
) => {
  return res.status(200).send({ data, message, success: true });
};
