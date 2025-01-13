import IUser from "../../user/interfaces/IUser";
import IAuthDTO from "./IAuthDTO";

export interface IAuthService {
    login(loginData: IAuthDTO): Promise<string>;
    register(userData: IUser): Promise<string>;
  }  