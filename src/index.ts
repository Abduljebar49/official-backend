import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import allRoute from "./routes";
import cors from "cors";
import { errorHandler } from "./middleware/error";
import authHandler from "./middleware/auth";

dotenv.config();

const port = process.env.PORT ?? 3000;

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
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

async function main() {
  try {
    app.use(express.json());
    app.use(logger("dev"));
    app.use(express.static("./public"));
    app.use(errorHandler);
    // app.use(authHandler);
    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to Easy");
    });
    app.use("/api", allRoute);
    app.listen(Number(port), "127.0.0.1", () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("Prisma Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Error in main function:", e);
  process.exit(1);
});
