import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import cinemaRoomDb from "../db/cinema-rooms.json";
import getErrorMessage from "../utils/getErrorMessage";
import { createReservedOrder, findReservation, getTicketsReservedByCurrentUser } from ".";

export const sendReservation = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const userId = res.locals.user?.id as string;
    const reservationId = req.params?.id;
    console.log("userid", userId);
    if (!reservationId) throw Error("Reservation was not found");

    if (userId) {
      const orderId = (userId + reservationId).replaceAll("-", "");
      createReservedOrder(orderId, userId);

      const reservation = findReservation(reservationId);
      const reservedTickets = getTicketsReservedByCurrentUser(orderId);
      if (reservedTickets) {
        res.json({ ...reservation, reservedTickets: [...reservedTickets] });
        // res.end();
      } else {
        res.json(reservation);
        // res.end();
      }
    } else {
      const reservation = findReservation(reservationId);

      res.json(reservation);
    }
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendCinemaRoom = async (req: Request, res: Response) => {
  console.log("hit");
  try {
    const cinemaRoomId = req.params.id;
    console.log("cinemeromom id", cinemaRoomId);
    const holder = cinemaRoomDb;
    const [cinemaRoom] = holder.filter(cinemaroom => cinemaroom.id == cinemaRoomId);
    if (!cinemaRoom) {
      throw new Error(ErrorMessage.CINEMA_ROOM_NOT_FOUND);
    }
    res.json(cinemaRoom);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendCinemasRoomNames = (req: Request, res: Response) => {
  try {
    const holder = cinemaRoomDb;
    const cinemaRoom = holder.map(cinemaroom => cinemaroom.id);
    if (!cinemaRoom) {
      throw new Error(ErrorMessage.CINEMA_ROOM_NOT_FOUND);
    }
    res.json(cinemaRoom);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
