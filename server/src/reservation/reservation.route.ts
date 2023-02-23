import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";
import { sendCinemaRoom, sendCinemasRoomNames, sendReservation } from ".";

const reservationRouter = Router();
reservationRouter.get("/:id", deserialaizeUser, sendReservation);
// reservationRouter.patch("/:id", deserialaizeUser, [deserialaizeUser, requireUser], updateOrderController);
reservationRouter.get("/cinemaroom/names", [deserialaizeUser, requireUser], sendCinemasRoomNames);
reservationRouter.get("/cinemaroom/:id", sendCinemaRoom);
export default reservationRouter;
