import IUser from "./IUser";
import IUserCreationDTO from "./IUserCreationDTO";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  create(user: IUserCreationDTO): Promise<IUser>;
  update(id: string, updates: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<boolean | null>;
}
