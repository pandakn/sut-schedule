import { UserPayload } from "../controllers/authentication.controller";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const cookie = req.cookies.refreshToken;
  const token: string = authHeader?.split(" ")[1] || cookie;

  if (!token) {
    res.status(401).json({ message: "Missing token, authorization denied" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const payload = decodedToken as UserPayload;
    req.user = payload;
    next();
  });
};

export const adminCheck = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Unauthorized, admin access required" });
    return;
  }

  next();
};
