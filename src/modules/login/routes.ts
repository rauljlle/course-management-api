import { Router } from "express";
import { AuthController } from "./auth/AuthController";
import { validate } from "../../utils/ValidatorUtil";
import { validateLogin } from "./auth/AuthDTOValidator";
import { validateUser } from "./user/UserValidator";

const { login, register } = AuthController;

const router = Router();

router.use((res, req, next) => {
  validate(res, req, next);
});

router.post("/", validateLogin, login);
router.post("/register", validateUser, register);

export default router;
