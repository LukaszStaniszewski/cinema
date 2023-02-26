import { Router } from "express";

import {
  isGivenTermFree,
  sendDaysThatHaveAddedRepertuire,
  sendRepertuireBasis,
  sendShowingBasis,
  sendShowings,
} from "../controllers/showings.controler";
import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";

const showingRouter = Router();

showingRouter.get("/availability*", [deserialaizeUser, requireUser], isGivenTermFree);
showingRouter.get("/:id", sendShowingBasis);
showingRouter.get("/", sendShowings);
showingRouter.get("/repertuire/set", [deserialaizeUser, requireUser], sendDaysThatHaveAddedRepertuire);
showingRouter.get("/repertuire/:day", [deserialaizeUser, requireUser], sendRepertuireBasis);
export default showingRouter;
