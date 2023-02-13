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

export const createOrder = (orderId: string) => {
  if (orderId in db["orders"]) return;
  console.log("hit new order");
  const order = { ...db["orders"], [orderId]: { tickets: [] } };
  db["orders"] = order;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), async err => {
    throw new Error(`file couldn't be overwritten: ${err}`);
  });
  return order;
};

export const getTicketsReservedByCurrentUser = (orderId: string) => {
  if (doesExist(orderId)) {
    const order = db["orders"][orderId];
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

export const updateOrder = async (userId: string, reservationId: string, tickets: Ticket[]) => {
  // const orderId = (userId + reservationId).replaceAll("-", "") as keyof typeof db.orders;

  // if (orderId in db["orders"]) {
  //   const updatedOrder = { [orderId]: { tickets: [...db.orders[orderId].tickets, ticket] } };
  //   const order = { ...db["orders"], updatedOrder };
  //   db["orders"] = order;
  //   fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), async err => {
  //     throw new Error(`file couldn't be overwritten: ${err}`);
  //   });
  // } else {
  //   throw new Error("order doesn't exist");
  // }
  console.log("ticket", tickets);

  const orderId = (userId + reservationId).replaceAll("-", "");

  if (doesExist(orderId)) {
    const updatedOrder = { [orderId]: { tickets: tickets } };
    const order = { ...db["orders"], ...updatedOrder };
    db["orders"] = order;
    fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
      return;
    });
  } else {
    // throw new Error("order doesn't exist");
  }
};
function doesExist(orderId: string): orderId is keyof typeof db.orders {
  return orderId in db["orders"];
}
