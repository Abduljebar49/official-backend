import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    console.log("inside auth handler");

    // Define public paths that bypass authentication
    const publicPaths = [
      { path: "/api/login", method: "ALL" },
      { path: "/api/login/super", method: "ALL" },
      { path: "/api/send/welcome", method: "ALL" },
      { path: "/api/users", method: "POST" }
    ];

    // Check if the current request matches a public path
    const isPublic = publicPaths.some(
      route => route.path === req.originalUrl && (route.method === req.method || route.method === "ALL")
    );

    if (isPublic) {
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
