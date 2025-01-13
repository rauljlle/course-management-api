import { Router } from "express";
import { AuthController } from "./auth/AuthController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;
