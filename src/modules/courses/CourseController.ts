import { Request, Response } from "express";
import { CourseService } from "./CourseService";
import { CourseRepository } from "./CourseRepository";

const courseService = new CourseService(new CourseRepository());

export class CourseController {

  static async createCourse(req: Request, res: Response) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json( errorMessage(error) );
    }
  }

  static async getCourses(req: Request, res: Response) {
    try {
      const filters = req.query;
      const courses = await courseService.getCourses(filters);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json( errorMessage(error) );
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ error: "Course not found" });

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json( errorMessage(error) );
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      if (!course) return res.status(404).json({ error: "Course not found" });

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json( errorMessage(error) );
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      const success = await courseService.deleteCourse(req.params.id);
      if (!success) return res.status(404).json({ error: "Course not found" });

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json( errorMessage(error) );
    }
  }
}
function errorMessage(err: unknown | undefined): {error: string} {
    if(err instanceof Error){
        return {error: err.message}
    }

    return {error: "Something went wrong"}
}

