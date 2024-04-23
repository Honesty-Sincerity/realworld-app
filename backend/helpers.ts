import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import { set } from "lodash";

dotenv.config();

export const validateMiddleware = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation: any) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next;
    }

    res.status(422).json({ errors: errors.array() });
  };
};

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // @ts-ignore
    if (req.user.sub) {
      // @ts-ignore
      set(req.user, "id", req.user.sub);
    }
    return next();
  }
  res.status(401).send({
    error: "Unauthorized",
  });
};
