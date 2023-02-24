import { Router } from "express";

import {
  isGivenTermFree,
  sendRepertuireBasis,
  sendShowingBasis,
  sendShowings,
} from "../controllers/showings.controler";

const showingRouter = Router();

showingRouter.get("/availability*", isGivenTermFree);
showingRouter.get("/:id", sendShowingBasis);
showingRouter.get("/", sendShowings);
showingRouter.get("/repertuire/:day", sendRepertuireBasis);
export default showingRouter;
