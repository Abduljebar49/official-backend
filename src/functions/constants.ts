import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

export const baseUrl = "https://academy-be.debbal.com/";

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
  status: number = 200
) => {
  return res.status(status).send({ data, message, success: true });
};

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    JSON.parse(JSON.stringify(user)),
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );
};

export const editGeneratedAccessToken = (authHeader: string) => {
  return jwt.sign(authHeader, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1s",
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../../public/courses");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("file :", file);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

export const upload = multer({ storage: storage });
