import { Request, Response } from "express";
import { CourseService } from "./CourseService";
import { CourseRepository } from "./CourseRepository";
import { getErrorMessage } from "../../utils/ErrorMessageUtil";

const courseService = new CourseService(new CourseRepository());

export class CourseController {

  static async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json( {error: getErrorMessage(error)} );
    }
  }

  static async getCourses(req: Request, res: Response) {
    try {
      const filters = req.query;
      const courses = await courseService.getCourses(filters);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json( {error: getErrorMessage(error)} );
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
        }

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json( {error: getErrorMessage(error)} );
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
        }

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json( {error: getErrorMessage(error)} );
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      const course = await courseService.deleteCourse(req.params.id);
      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
        }

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json( {error: getErrorMessage(error)} );
    }
  }
}
