"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("./auth/AuthController");
const router = (0, express_1.Router)();
router.post("/login", AuthController_1.AuthController.login);
router.post("/register", AuthController_1.AuthController.register);
exports.default = router;
