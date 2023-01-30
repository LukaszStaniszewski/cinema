import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";

export const getShowings = async (req: Request, res: Response) => {
  const day = req.query["day"];
  try {
    const showings = db.showings.filter(showing => showing.day === day);
    if (!showings.length) {
      throw new Error(ErrorMessage.SHOWINGS_NOT_FOUND);
    }
    res.json(showings);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
