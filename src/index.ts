import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import allRoute from "./routes";
import cors from "cors";
import { errorHandler } from "./middleware/error";

dotenv.config();

const port = process.env.PORT ?? 3002;

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const prisma = new PrismaClient();

async function main() {
  app.use(express.json());
  app.use(logger("dev"));
  app.use(express.static("./public"));
  app.use(errorHandler);
  app.use("/api", allRoute);
  app.listen(port, () => console.log(`listening on another port ${port}`));
}
// main()
main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(1);
  })
  .catch(async (e) => {
    // console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
