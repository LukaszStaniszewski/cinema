import { Request, Response } from "express";
import { omit } from "lodash";

import { ErrorMessage } from "../config/constants.config";
import * as key from "../config/keys";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";
import { signJwt } from "../utils/jtw.utils";
import logger from "../utils/logger";

export const authenticate = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, { password: string; email: string }>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = db.users.find(user => user.email === email && user.password === password);
    if (!user) {
      throw new Error("User not found");
    }
    const adjustedUser = omit(user, "password");
    const accessToken = signJwt(adjustedUser, key.privateAccessKey, "1h");

    res.cookie("accessToken", accessToken, {
      maxAge: 36000000, // 10h
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    res.json(user);
  } catch (error) {
    logger.error(getErrorMessage(error));
    res.status(409).json(getErrorMessage(error));
  }
};

export const autoLogin = async (req: Request, res: Response) => {
  try {
    const user = res.locals?.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(418);
  }
};
