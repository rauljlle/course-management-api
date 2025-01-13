import ICourse from "./interfaces/ICourse";
import ICourseCreationDTO from "./interfaces/ICourseCreationDTO";
import { ICourseRepository } from "./interfaces/ICourseRepository";

export class CourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async createCourse(courseData: ICourseCreationDTO): Promise<ICourse> {
    return this.courseRepository.create(courseData);
  }

  async getCourses(filters: Partial<ICourse> = {}): Promise<ICourse[]> {
    return this.courseRepository.findAll(filters);
  }

  async getCourseById(id: string): Promise<ICourse | null> {
    return this.courseRepository.findById(id);
  }

  async updateCourse(id: string, updates: Partial<ICourse>): Promise<ICourse | null> {
    return this.courseRepository.update(id, updates);
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.courseRepository.delete(id);
  }
}
