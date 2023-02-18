import { Request, Response } from "express";

import { ErrorMessage } from "../config/constants.config";
import { Ticket } from "../reservation";
import getErrorMessage from "../utils/getErrorMessage";
import { findOrders, remove, updateOrder } from ".";

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
    const orders = findOrders(userId);

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

    remove(orderId);
    res.status(204).send("ok");
    res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
