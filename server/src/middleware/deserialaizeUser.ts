import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

import { ErrorMessage } from "../config/constants.config";
import * as key from "../config/keys";
import { verifyToken } from "../utils/jtw.utils";

const deserialaizeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "cookies.accessToken");

  if (!accessToken) return next();

  const { decoded, expired } = verifyToken(accessToken, key.publicAccessKey);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired) return res.status(403).json(ErrorMessage.JWT_EXPIRED);

  next();
};

export default deserialaizeUser;
