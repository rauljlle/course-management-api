import IUserCreationDTO from "../../user/interfaces/IUserCreationDTO";
import IAuthDTO from "./IAuthDTO";

export interface IAuthService {
  login(loginData: IAuthDTO): Promise<string>;
  register(userData: IUserCreationDTO): Promise<string>;
}
