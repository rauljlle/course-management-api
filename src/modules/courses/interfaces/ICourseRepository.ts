import ICourse from "./ICourse";
import ICourseCreationDTO from "./ICourseCreationDTO";

export interface ICourseRepository {
  create(course: ICourseCreationDTO): Promise<ICourse>;
  findAll(filters?: Partial<ICourse>): Promise<ICourse[]>;
  findById(id: string): Promise<ICourse | null>;
  update(id: string, updates: Partial<ICourse>): Promise<ICourse | null>;
  delete(id: string): Promise<boolean>;
}
