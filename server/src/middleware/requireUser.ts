import { NextFunction, Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).json(ErrorMessage.NOT_AUTHORIZED);
  }

  return next();
};

export default requireUser;
