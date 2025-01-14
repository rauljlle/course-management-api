import { body } from "express-validator";

export const validateUser = [
  body("username")
    .isString()
    .withMessage("Username must be a string.")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters."),

  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters."),

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
