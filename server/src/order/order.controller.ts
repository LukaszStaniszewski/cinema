import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import { Ticket } from "../reservation";
import getErrorMessage from "../utils/getErrorMessage";
import { addPayed, findReservedOrders, Order, removeReserved, updateOrder } from ".";

export const updateOrderController = (req: Request<{ id: string }, { ticket: Ticket[] }>, res: Response) => {
  try {
    const userId = res.locals.user?.id as string;
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
    const userId = res.locals.user?.id as string;
    const orders = findReservedOrders(userId);

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
  req: Request<Record<string, unknown>, Record<string, unknown>, Omit<Order, "userId">>,
  res: Response
) => {
  const userId = res.locals.user?.id as string;
  const order = req.body;

  try {
    if (userId) {
      addPayed({ ...order, userId: userId });
    } else {
      addPayed(order);
    }
    res.status(200);
  } catch (error) {
    res.status(400);
  }
};
