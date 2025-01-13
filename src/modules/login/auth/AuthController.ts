import { Request, Response } from "express";
import { AuthService } from "./AuthService";
import { UserRepository } from "../user/UserRepository";
import IUserCreationDTO from "../user/interfaces/IUserCreationDTO";
import { getErrorMessage } from "../../../utils/ErrorMessageUtil";

const authService = new AuthService(new UserRepository());

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await authService.login({email, password});
      res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { email, password, username, name }: IUserCreationDTO = req.body;
      const token = await authService.register({ email, username, password, name });
      res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
  }
}
