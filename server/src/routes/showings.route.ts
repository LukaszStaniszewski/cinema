import { Router } from "express";

import { getShowings } from "../controllers/showings.controler";
import requireUser from "../middleware/requireUser";

const collectionRouter = Router();

collectionRouter.get("/", getShowings);
export default collectionRouter;
