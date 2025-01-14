import { Request, Response, NextFunction } from "express";
import { ContextRunner } from "express-validator";

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction,
  validations: ContextRunner[],
) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
  }

  next();
};
