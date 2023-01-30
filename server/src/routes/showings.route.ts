import { Router } from "express";

import { getShowings } from "../controllers/showings.controler";
import requireUser from "../middleware/requireUser";

const showingRouter = Router();

showingRouter.get("/", getShowings);
export default showingRouter;
