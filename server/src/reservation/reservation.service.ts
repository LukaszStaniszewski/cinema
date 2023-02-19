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

export const createReservedOrder = (orderId: string, userId: string) => {
  if (orderId in db.orders.reserved) return;
  const order = { ...db.orders.reserved, [orderId]: { userId, tickets: [] } };
  db.orders.reserved = order;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), async err => {
    throw new Error(`file couldn't be overwritten: ${err}`);
  });
  return order;
};

export const getTicketsReservedByCurrentUser = (orderId: string) => {
  if (doesExist(orderId)) {
    const order = db.orders.reserved[orderId].tickets;
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

function doesExist(id: string): id is keyof typeof db.orders.reserved {
  return id in db.orders.reserved;
}
