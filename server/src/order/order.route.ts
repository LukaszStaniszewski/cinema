import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import { sendGivenUserOrders, updateOrderController } from ".";

const orderRouter = Router();
orderRouter.patch("/:id", [deserialaizeUser, requireUser], updateOrderController);
orderRouter.get("/", [deserialaizeUser, requireUser], sendGivenUserOrders);

export default orderRouter;
