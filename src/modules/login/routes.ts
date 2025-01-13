import { Router } from "express";
import { AuthController } from "./auth/AuthController";

const router = Router();

router.post("/", AuthController.login);
router.post("/register", AuthController.register);

export default router;
