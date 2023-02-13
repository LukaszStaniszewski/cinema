import { Router } from "express";

import { sendTicketDetails } from "../controllers/ticket.controller";

const ticketRouter = Router();

ticketRouter.get("/", sendTicketDetails);

export default ticketRouter;
