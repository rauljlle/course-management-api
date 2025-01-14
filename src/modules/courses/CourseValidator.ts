import { body } from "express-validator";

export const validateCourse = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isNumeric()
    .withMessage("Duration must be a number")
    .custom((value) => value > 0)
    .withMessage("Duration must be a positive number"),

  body("instructor")
    .trim()
    .notEmpty()
    .withMessage("Instructor is required")
    .isString()
    .withMessage("Instructor must be a string"),
];
