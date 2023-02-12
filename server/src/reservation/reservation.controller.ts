import { Request, Response } from "express";
import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";
import { createOrder, findReservation } from ".";

export const sendReservation = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const userId = res.locals.user?.id as string;
    const reservationId = req.params?.id;
    if (userId) {
      createOrder(userId, reservationId);
    }
    const reservation = findReservation(reservationId);
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
      throw new Error(ErrorMessage.CINEMA_ROOM_NOT_FOUND);
    }
    res.json(cinemaRoom);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
