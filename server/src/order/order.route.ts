import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import { addPayedOrder, deleteOrder, sendGivenUserOrders, updateOrderController } from ".";

const orderRouter = Router();
orderRouter.patch("/:id", [deserialaizeUser, requireUser], updateOrderController);
orderRouter.get("/", [deserialaizeUser, requireUser], sendGivenUserOrders);
orderRouter.post("/payed/:id", deserialaizeUser, addPayedOrder);
orderRouter.delete("/:id", [deserialaizeUser, requireUser], deleteOrder);

export default orderRouter;
