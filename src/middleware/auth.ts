import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface AuthenticatedRequest extends Request {
  user?: any;
}

const authHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const publicPaths = [
      "/api/users",
      "/api/auth/login",
    ];

    console.log("url : ",req.originalUrl);

    if (publicPaths.includes(req.originalUrl)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.sendStatus(401);
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) {
          return res.status(403).send({
            statusCode: 403,
            message: "Unauthorized",
            error: err.message
          });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).send({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(401).send({
      message: "Unauthenticated",
      error: e,
    });
  }
};

export default authHandler;
