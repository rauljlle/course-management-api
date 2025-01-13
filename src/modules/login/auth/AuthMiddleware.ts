import { Request, Response, NextFunction } from "express";
import { JWTUtils } from "../../../utils/JWTUtil";
import { JwtPayload } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = JWTUtils.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  interface userReq extends Request {
    user: string | JwtPayload;
  }

  (req as userReq).user = decoded;
  next();
};
