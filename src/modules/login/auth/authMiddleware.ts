import { Request, Response, NextFunction } from "express";
import { JWTUtils } from "../../../utils/JWTUtil";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = JWTUtils.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  (req as any).user = decoded;
  next();
};
