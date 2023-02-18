import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type TicketDetails = {
  type: TicketTypes;
  price: number;
};

export type TicketTypes = "normalny" | "ulgowy" | "family" | "voucher";

export type Ticket = {
  id: string;
  seat: Seat;
  type: TicketTypes;
  price: number;
};

export const createOrder = (orderId: string, userId: string) => {
  if (orderId in db["orders"]) return;
  const order = { ...db["orders"], [orderId]: { userId, tickets: [] } };
  db["orders"] = order;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), async err => {
    throw new Error(`file couldn't be overwritten: ${err}`);
  });
  return order;
};

export const getTicketsReservedByCurrentUser = (orderId: string) => {
  if (doesExist(orderId)) {
    const order = db["orders"][orderId].tickets;
    return order;
  }
  return;
};

export const findReservation = (reservationId: string) => {
  const [reservation] = db["reservations"].filter(reservation => reservation.id == reservationId);
  if (!reservation) {
    throw new Error(ErrorMessage.RESERVATION_NOT_FOUND);
  }
  return reservation;
};

function doesExist(id: string): id is keyof typeof db.orders {
  return id in db["orders"];
}
