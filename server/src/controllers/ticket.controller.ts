import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import db from "../db/db.json";
import getErrorMessage from "../utils/getErrorMessage";

export const sendTicketDetails = async (req: Request, res: Response) => {
  try {
    const ticketDetails = db.ticketInfo;
    if (!ticketDetails.length) {
      throw new Error(ErrorMessage.SHOWINGS_NOT_FOUND);
    }
    res.json(ticketDetails);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
