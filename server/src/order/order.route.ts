import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import {
  addPayedOrder,
  deleteOrder,
  sendGivenUserOrders,
  sendPayedOrderEmail,
  updateOrderController,
  validateCouponCodeHandler,
} from ".";

const orderRouter = Router();
orderRouter.patch("/:id", [deserialaizeUser, requireUser], updateOrderController);
orderRouter.get("/", [deserialaizeUser, requireUser], sendGivenUserOrders);
orderRouter.post("/payed/:id", deserialaizeUser, addPayedOrder);
orderRouter.get("/email/:id", sendPayedOrderEmail);
orderRouter.delete("/:id", [deserialaizeUser, requireUser], deleteOrder);
orderRouter.get("/coupon/:id", validateCouponCodeHandler);

export default orderRouter;
