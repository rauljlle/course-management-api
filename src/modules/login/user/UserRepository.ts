import { IUserRepository } from "./interfaces/IUserRepository";
import UserModel from "./UserModel"
import IUser from "./interfaces/IUser";
import IUserCreationDTO from "./interfaces/IUserCreationDTO";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
      return UserModel.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
      return UserModel.findOne({ username });
    }

    async create(user: IUserCreationDTO): Promise<IUser> {
        const newUser = new UserModel(user);
        return newUser.save();
    }

    async update(id: string, updates: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, updates, { new: true });
    }

    async delete(id: string): Promise<boolean | null> {
        return UserModel.findByIdAndDelete(id);
    }
}
