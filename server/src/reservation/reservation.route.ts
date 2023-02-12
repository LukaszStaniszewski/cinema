import { Router } from "express";

import deserialaizeUser from "../middleware/deserialaizeUser";
import { sendCinemaRoom, sendReservation } from "./reservation.controller";

const reservationRouter = Router();
reservationRouter.get("/:id", deserialaizeUser, sendReservation);
reservationRouter.get("/cinemaroom/:id", sendCinemaRoom);
export default reservationRouter;
