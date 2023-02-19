import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { ErrorMessage } from "../config/constants.config";
import { User } from "../controllers/auth.controller";
import db from "../db.json";
import { Ticket } from "../reservation";
type ShowingPartial = {
  title: string;
  day: string;
  time: string;
  image: string;
  reservationId: string;
};
type ReservedOrder = {
  userId: string;
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
// export const updateOrder = (userId: string, reservationId: string, tickets: Ticket[]) => {
//   const orderId = (userId + reservationId).replaceAll("-", "");

//   if (doesExist(userId)) {
//     const updatedOrder = { [orderId]: { tickets: tickets } };
//     const order = { ...db["orders"][userId], ...updatedOrder };
//     db["orders"][userId][orderId] = order as ReservedOrder
//     fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
//       // throw new Error(`file couldn't be overwritten: ${err}`);
//       return;
//     });
//   } else {
//     // throw new Error("order doesn't exist");
//   }
// };
export const updateOrder = (userId: string, reservationId: string, order: ReservedOrder) => {
  const orderId = (userId + reservationId).replaceAll("-", "");
  console.log("hit");

  if (doesExist(orderId)) {
    const updated = { ...order, userId };
    // const updatedOrder = { [orderId]: updated };
    db.orders.reserved[orderId] = updated;
    fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
      return;
    });
    return;
  } else {
    throw new Error("order doesn't exist");
  }
};

function doesExist(orderId: string): orderId is keyof typeof db.orders.reserved {
  return orderId in db["orders"].reserved;
}

export const findReservedOrders = (userId: string) => {
  const reservedOrders = db.orders.reserved;
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
  const reservedOrders = db.orders.reserved;
  if (doesExist(orderId)) {
    delete reservedOrders[orderId];
  }
  db.orders.reserved = reservedOrders;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
    // throw new Error(`file couldn't be overwritten: ${err}`);
    return;
  });
};

export const addPayed = (order: Order) => {
  const orderId = uuidv4();
  const newOrder = { [orderId]: order };
  db.orders.payed = newOrder;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
    throw new Error(`new payed order: ${err}`);
    // return;
  });
};
