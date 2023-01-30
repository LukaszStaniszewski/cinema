import { Router } from "express";

import { sendCinemaRoom, sendReservation } from "../controllers/reservation.controller";

const reservationRouter = Router();
reservationRouter.get("/:id", sendReservation);
reservationRouter.get("/cinemaroom/:id", sendCinemaRoom);
export default reservationRouter;
