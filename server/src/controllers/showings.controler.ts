import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";

export const sendShowings = async (req: Request, res: Response) => {
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

export const sendShowingBasis = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservationId = req.params.id;

    const [reservation] = db["reservations"].filter(reservation => reservation.id == reservationId);
    if (!reservation) {
      throw new Error(ErrorMessage.RESERVATION_NOT_FOUND);
    }
    const showingBasis = db.showings
      .filter(({ movie }) => reservation.movieId == movie.id)
      .map(({ movie, day, available }) => {
        return {
          title: movie.title,
          day,
          image: movie.image,
          time: available.find(at => at.reservationId == reservation.id)?.time,
        };
      })[0];
    res.json(showingBasis);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
