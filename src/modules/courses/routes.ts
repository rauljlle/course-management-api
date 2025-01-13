import { Router } from "express";
import { authenticate } from "../login/auth/AuthMiddleware";
import { CourseController } from "./CourseController";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  CourseController.createCourse,
);
router.get(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  CourseController.getCourses,
);
router.get(
  "/:id",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  CourseController.getCourseById,
);
router.put(
  "/:id",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  CourseController.updateCourse,
);
router.delete(
  "/:id",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  CourseController.deleteCourse,
);

export default router;
