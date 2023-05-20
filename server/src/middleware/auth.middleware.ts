import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  user: {
    id: string;
    name: string;
    username: string;
  };
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    username: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const cookie = req.cookies.refreshToken;
  const token: string | undefined = authHeader?.split(" ")[1] || cookie;

  // console.log("authHeader", authHeader);

  if (!token) {
    res.status(401).json({ message: "Missing token, authorization denied" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const payload = decodedToken as TokenPayload;
    req.user = payload.user;
    next();
  });
};
