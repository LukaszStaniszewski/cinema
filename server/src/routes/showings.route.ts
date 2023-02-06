import { Router } from "express";

import { sendShowingBasis, sendShowings } from "../controllers/showings.controler";

const showingRouter = Router();

showingRouter.get("/:id", sendShowingBasis);
showingRouter.get("/", sendShowings);
export default showingRouter;
