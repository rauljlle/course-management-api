import { JWTUtils } from "../../../utils/JWTUtil";
import { PasswordUtils } from "../../../utils/PasswordUtil";
import IUserCreationDTO from "../user/interfaces/IUserCreationDTO";
import { IUserRepository } from "../user/interfaces/IUserRepository";
import IAuthDTO from "./interfaces/IAuthDTO";
import { IAuthService } from "./interfaces/IAuthService";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(loginData: IAuthDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user || !(await PasswordUtils.comparePasswords(loginData.password, user.password))) {
      throw new Error("Invalid email or password");
    }

    return JWTUtils.generateToken({ id: user._id, email: user.email });
  }

  async register(userData: IUserCreationDTO): Promise<string> {
    const existingUserEmail = await this.userRepository.findByEmail(userData.email);
    if (existingUserEmail) {
      throw new Error("Email already in use");
    }

    const existingUsername = await this.userRepository.findByUsername(userData.username);
    if (existingUsername) {
      throw new Error("Username already in use");
    }

    const hashedPassword = await PasswordUtils.hashPassword(userData.password);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return JWTUtils.generateToken({ id: user._id, email: user.email });
  }
}
