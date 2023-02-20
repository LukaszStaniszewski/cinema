import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { ErrorMessage } from "../config/constants.config";
import { User } from "../controllers/auth.controller";
import db from "../db/db.json";
import payedOrdersDB from "../db/paidOrders.json";
import { Ticket } from "../reservation";
type ShowingPartial = {
  title: string;
  day: string;
  time: string;
  image: string;
  reservationId: string;
};
type ReservedOrder = {
  userId: number;
  tickets: Ticket[];
  url: string;
  showingPartial: ShowingPartial;
};

export type Order = {
  userCredentials: User;
  userId?: string;
  tickets: Ticket[];
  showingPartial: ShowingPartial;
  totalPrice: number;
};

export const updateOrder = (userId: number, reservationId: string, order: ReservedOrder) => {
  const orderId = (userId + reservationId).replaceAll("-", "");
  console.log("Update order hit");

  if (doesExist(orderId)) {
    const updated = { ...order, userId };
    // const updatedOrder = { [orderId]: updated };
    db.orders[orderId] = updated;
    fs.writeFile("./src/db/db.json", JSON.stringify(db, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
      return;
    });
    return;
  } else {
    throw new Error("order doesn't exist");
  }
};

function doesExist(orderId: string): orderId is keyof typeof db.orders {
  return orderId in db["orders"];
}

export const findReservedOrders = (userId: number) => {
  const reservedOrders = db.orders;
  let holder: Pick<ReservedOrder, "showingPartial" | "url">[] & { orderId: string }[] = [];

  for (const orderId in reservedOrders) {
    if (doesExist(orderId)) {
      if (reservedOrders[orderId].userId === userId && reservedOrders[orderId].tickets.length > 0) {
        const { showingPartial, url } = reservedOrders[orderId];
        holder = [...holder, { showingPartial, url, orderId: orderId }];
      }
    }
  }
  if (holder.length < 1) {
    throw new Error("given user doesn't have any orders yet");
  }
  return holder;
};

export const removeReserved = (orderId: string) => {
  console.log("hit remove");
  const reservedOrders = db.orders;

  if (doesExist(orderId)) {
    delete reservedOrders[orderId];
  }
  db.orders = reservedOrders;
  fs.writeFile("./src/db/db.json", JSON.stringify(db, null, 2), err => {
    // throw new Error(`file couldn't be overwritten: ${err}`);
    // return;
  });
};

export const addPayed = (order: Order) => {
  const orderId = uuidv4();
  // const newOrder = { [orderId]: order };
  let db = payedOrdersDB;
  db = { ...db, [orderId]: order };
  fs.writeFile("./src/db/paidOrders.json", JSON.stringify(db, null, 2), err => {
    // throw new Error(`new payed order: ${err}`);
    // return;
  });
  return orderId;
};

export const validateCouponCode = (code: string) => {
  return db.validCoupons.some(validCoupon => validCoupon === code);
};

export function doesPayedExist(orderId: string): orderId is keyof typeof payedOrdersDB {
  return orderId in payedOrdersDB;
}
export const simulateAwait = async (time: number, id: string) => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(removeReserved(id));
    }, time);
  });
};
