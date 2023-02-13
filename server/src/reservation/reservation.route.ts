import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import { sendCinemaRoom, sendReservation, updateOrderController } from ".";

const reservationRouter = Router();
reservationRouter.get("/:id", deserialaizeUser, sendReservation);
reservationRouter.patch("/:id", deserialaizeUser, [deserialaizeUser, requireUser], updateOrderController);
reservationRouter.get("/cinemaroom/:id", sendCinemaRoom);
export default reservationRouter;
