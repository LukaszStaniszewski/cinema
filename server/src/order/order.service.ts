import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db.json";
import { Ticket } from "../reservation";

type Order = {
  userId: string;
  tickets: Ticket[];
  url?: string;
  showingPartial?: {
    title: string;
    day: string;
    time: string;
    image: string;
    reservationId?: string;
  };
};

// export const updateOrder = (userId: string, reservationId: string, tickets: Ticket[]) => {
//   const orderId = (userId + reservationId).replaceAll("-", "");

//   if (doesExist(userId)) {
//     const updatedOrder = { [orderId]: { tickets: tickets } };
//     const order = { ...db["orders"][userId], ...updatedOrder };
//     db["orders"][userId][orderId] = order as Order
//     fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
//       // throw new Error(`file couldn't be overwritten: ${err}`);
//       return;
//     });
//   } else {
//     // throw new Error("order doesn't exist");
//   }
// };
export const updateOrder = (userId: string, reservationId: string, order: Order) => {
  const orderId = (userId + reservationId).replaceAll("-", "");
  console.log("hit");

  // if (doesExist(orderId)) {
  //   const updatedOrder = { [orderId]: { ...order, userId } };
  //   const updatedOrders = { ...db["orders"], ...updatedOrder };
  //   db["orders"] = updatedOrders;
  //   fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
  //     // throw new Error(`file couldn't be overwritten: ${err}`);
  //     return;
  //   });
  // } else {
  //   // throw new Error("order doesn't exist");
  // }
  if (doesExist(orderId)) {
    const updated = { ...order, userId };
    // const updatedOrder = { [orderId]: updated };
    db["orders"][orderId] = updated;
    fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
      return;
    });
    return;
  } else {
    throw new Error("order doesn't exist");
  }
};

function doesExist(userId: string): userId is keyof typeof db.orders {
  return userId in db["orders"];
}

export const findOrders = (userId: string) => {
  const orders = db.orders;
  let holder: Pick<Order, "showingPartial" | "url">[] & { orderId: string }[] = [];

  for (const orderId in orders) {
    if (doesExist(orderId)) {
      if (orders[orderId].userId === userId && orders[orderId].tickets.length > 0) {
        const { showingPartial, url } = orders[orderId];
        holder = [...holder, { showingPartial, url, orderId: orderId }];
      }
    }
  }
  if (holder.length < 1) {
    throw new Error("given user doesn't have any orders yet");
  }
  return holder;
};

export const remove = (orderId: string) => {
  const orders = db.orders;
  if (doesExist(orderId)) {
    delete orders[orderId];
  }
  db.orders = orders;
  fs.writeFile("./src/db.json", JSON.stringify(db, null, 2), err => {
    // throw new Error(`file couldn't be overwritten: ${err}`);
    return;
  });
};
