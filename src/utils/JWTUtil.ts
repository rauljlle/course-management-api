import jwt from "jsonwebtoken";
import { getErrorMessage } from "./ErrorMessageUtil";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export class JWTUtils {
  static generateToken(payload: object, expiresIn = "1h"): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }

  static verifyToken(token: string): jwt.JwtPayload | string | null {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      console.log(getErrorMessage(error));
      return null;
    }
  }
}
