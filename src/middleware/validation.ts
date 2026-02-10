import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

export function validateRequest(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      next(new AppError(400, error.errors?.[0]?.message || "Validation error"));
    }
  };
}
