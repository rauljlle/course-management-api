import { body } from "express-validator";

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .notEmpty()
    .withMessage("Email is required."),

  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long."),
];
