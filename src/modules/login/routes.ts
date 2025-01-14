import { Router } from "express";
import { AuthController } from "./auth/AuthController";
import { validate } from "../../utils/ValidatorUtil";
import { validateLogin } from "./auth/AuthDTOValidator";
import { validateUser } from "./user/UserValidator";

const { login, register } = AuthController;

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    validate(req, res, next, validateLogin);
  },
  login,
);
router.post(
  "/register",
  (req, res, next) => {
    validate(req, res, next, validateUser);
  },
  register,
);

export default router;
