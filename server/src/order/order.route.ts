import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import {
  addPayedOrder,
  deleteOrder,
  sendGivenUserOrders,
  sendGivenUserPayedOrders,
  sendPayedOrderEmail,
  updateOrderController,
  validateCouponCodeHandler,
} from ".";

const orderRouter = Router();
orderRouter.patch("/:id", [deserialaizeUser, requireUser], updateOrderController);
orderRouter.get("/", [deserialaizeUser, requireUser], sendGivenUserOrders);
orderRouter.get("/payed", [deserialaizeUser, requireUser], sendGivenUserPayedOrders);
orderRouter.post("/payed/:id", deserialaizeUser, addPayedOrder);
orderRouter.get("/email/:id", deserialaizeUser, sendPayedOrderEmail);
orderRouter.delete("/:id", [deserialaizeUser, requireUser], deleteOrder);
orderRouter.get("/coupon/:id", validateCouponCodeHandler);

export default orderRouter;
