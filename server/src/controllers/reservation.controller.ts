import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";

export const sendReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;

    const [reservation] = db["reservations"].filter(reservation => reservation.id == reservationId);
    if (!reservation) {
      throw new Error(ErrorMessage.WANNA_SEE_NOT_FOUND);
    }
    res.json(reservation);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendCinemaRoom = async (req: Request, res: Response) => {
  try {
    const cinemaRoomId = req.params.id;

    const [cinemaRoom] = db["cinemarooms"].filter(cinemaroom => cinemaroom.id == cinemaRoomId);
    if (!cinemaRoom) {
      throw new Error(ErrorMessage.WANNA_SEE_NOT_FOUND);
    }
    res.json(cinemaRoom);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
