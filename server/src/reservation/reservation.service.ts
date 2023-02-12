import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";

export const createOrder = async (userId: string, reservationId: string) => {
  const orderId = (userId + reservationId).replaceAll("-", "");

  if (orderId in db["orders"]) return;
  const order = { ...db["orders"], [orderId]: { tickets: [] } };
  db["orders"] = order;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), async err => {
    throw new Error(`file couldn't be overwritten: ${err}`);
  });
};

export const findReservation = (reservationId: string) => {
  const [reservation] = db["reservations"].filter(reservation => reservation.id == reservationId);
  if (!reservation) {
    throw new Error(ErrorMessage.RESERVATION_NOT_FOUND);
  }
  return reservation;
};
