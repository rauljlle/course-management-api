import { Router } from "express";
import { CourseController } from "./CourseController";
import { validateCourseCreation, validateCourseUpdate } from "./CourseValidator";
import { validate } from "../../utils/ValidatorUtil";

const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } =
  CourseController;

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    validate(req, res, next, validateCourseCreation);
  },
  createCourse,
);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put(
  "/:id",
  (req, res, next) => {
    validate(req, res, next, validateCourseUpdate);
  },
  updateCourse,
);
router.delete("/:id", deleteCourse);

export default router;
