import { Router } from "express";
import { authenticate } from "../login/auth/AuthMiddleware";
import { CourseController } from "./CourseController";
import { validateCourse } from "./CourseValidator";
import { validate } from "../../utils/ValidatorUtil";

const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } =
  CourseController;

const router = Router();

router.use((req, res, next) => {
  authenticate(req, res, next);
  validate(req, res, next);
});

router.post("/", validateCourse, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", validateCourse, updateCourse);
router.delete("/:id", deleteCourse);

export default router;
