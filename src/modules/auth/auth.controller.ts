import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { db } from "../../config/db/database";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(db);
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const result = await this.authService.signup({ name, email, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login({ email, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
