import IUser from "./IUser";
import IUserCreationDTO from "./IUserCreationDTO";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  create(user: IUserCreationDTO): Promise<IUser>;
}
