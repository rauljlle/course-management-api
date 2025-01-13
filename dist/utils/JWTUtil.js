"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
class JWTUtils {
    static generateToken(payload, expiresIn = "1h") {
        return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, SECRET_KEY);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JWTUtils = JWTUtils;
