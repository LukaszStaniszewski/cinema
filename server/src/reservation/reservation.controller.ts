import { Request, Response } from "express";
import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import getErrorMessage from "../utils/getErrorMessage";
import { createOrder, findReservation, getTicketsReservedByCurrentUser, Ticket } from ".";

export const sendReservation = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const userId = res.locals.user?.id as string;
    const reservationId = req.params?.id;
    console.log("user", userId);
    if (userId) {
      const orderId = (userId + reservationId).replaceAll("-", "");
      createOrder(orderId, userId);

      const reservation = findReservation(reservationId);
      const reservedTickets = getTicketsReservedByCurrentUser(orderId);
      if (reservedTickets) {
        res.json({ ...reservation, reservedTickets: [...reservedTickets] });
      } else {
        res.json(reservation);
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
  try {
    const cinemaRoomId = req.params.id;
    // const reservationId = req.params.id;
    // const { cinemaRoomId } = findReservation(reservationId);

    const [cinemaRoom] = db["cinemarooms"].filter(cinemaroom => cinemaroom.id == cinemaRoomId);
    if (!cinemaRoom) {
      throw new Error(ErrorMessage.CINEMA_ROOM_NOT_FOUND);
    }
    res.json(cinemaRoom);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

// export const updateOrderController = (req: Request<{ id: string }, { ticket: Ticket[] }>, res: Response) => {
//   try {
//     const userId = res.locals.user?.id as string;
//     const reservationId = req.params?.id;
//     updateOrder(userId, reservationId, req.body);
//     // const reservation = findReservation(reservationId);
//     res.status(204).send("ok");
//   } catch (error) {
//     res.status(404).json(getErrorMessage(error));
//   }
// };
