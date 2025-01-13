import { FilterQuery } from "mongoose";
import CourseModel from "./CourseModel";
import ICourse from "./interfaces/ICourse";
import { ICourseRepository } from "./interfaces/ICourseRepository";

export class CourseRepository implements ICourseRepository {
  async create(course: Partial<ICourse>): Promise<ICourse> {
    return CourseModel.create(course);
  }

  async findAll(filters: FilterQuery<ICourse> = {}): Promise<ICourse[]> {
    return await CourseModel.find(filters);
  }

  async findById(id: string): Promise<ICourse | null> {
    return CourseModel.findById(id);
  }

  async update(id: string, updates: Partial<ICourse>): Promise<ICourse | null> {
    return CourseModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await CourseModel.findByIdAndDelete(id);
    return result !== null;
  }
}
