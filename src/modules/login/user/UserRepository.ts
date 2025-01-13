import { IUserRepository } from "./interfaces/IUserRepository";
import UserModel from "./UserModel"
import IUser from "./interfaces/IUser";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
      return UserModel.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
      return UserModel.findOne({ username });
    }

    async create(user: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(user);
        return newUser.save();
    }
}
