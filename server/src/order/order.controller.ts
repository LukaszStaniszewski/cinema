import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import payedOrdersDB from "../db/paidOrders.json";
import { Ticket } from "../reservation";
import getErrorMessage from "../utils/getErrorMessage";
import { addPayed, doesPayedExist, findReservedOrders, Order, removeReserved, simulateAwait, updateOrder } from ".";

export const updateOrderController = (req: Request<{ id: string }, { ticket: Ticket[] }>, res: Response) => {
  try {
    const userId = res.locals.user?.id;
    const reservationId = req.params?.id;
    updateOrder(userId, reservationId, req.body);

    res.status(204).send("ok");
    res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendGivenUserOrders = (req: Request<{ id: string }>, res: Response) => {
  try {
    const userId = res.locals.user?.id;
    const orders = findReservedOrders(Number(userId));

    res.json(orders);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const deleteOrder = (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id as string;
    const reservationId = req.params?.id;
    const orderId = (userId + reservationId).replaceAll("-", "");

    removeReserved(orderId);
    res.status(204).send("ok");
    res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const addPayedOrder = (
  req: Request<{ id: string }, Record<string, unknown>, Omit<Order, "userId">>,
  res: Response
) => {
  const userId = res.locals.user?.id;
  const order = req.body;
  const reservationId = req.params.id;
  const reservedOrderId = (userId + reservationId).replaceAll("-", "");
  console.log("userId", userId, reservedOrderId);

  let payedOrderId = null;
  try {
    if (userId) {
      payedOrderId = addPayed({ ...order, userId: userId });
      removeReserved(reservedOrderId);
    } else {
      payedOrderId = addPayed(order);
    }

    res.json({ id: payedOrderId });

    // res.end();
  } catch (error) {
    res.status(400);
  }
};

export const sendPayedOrderEmail = (req: Request<{ id: string }>, res: Response) => {
  try {
    const orderId = req.params.id;
    if (doesPayedExist(orderId)) {
      const email = payedOrdersDB[orderId].userCredentials.email;
      res.json({ email: email });
    } else {
      throw new Error("this payed order doesn't exist");
    }
  } catch (error) {
    res.status(400);
  }
};
