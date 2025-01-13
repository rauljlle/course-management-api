"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const JWTUtil_1 = require("../../../utils/JWTUtil");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = JWTUtil_1.JWTUtils.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
};
exports.authenticate = authenticate;
