import { Router } from "express";

import {
  addMovieToWannaSeeList,
  deleteMovieFromWannaSeeList,
  sendFavoriteMovies,
  sendFavoriteMoviesIdList,
  sendTitlesController,
} from "../controllers/movie.controller";
import deserialaizeUser from "../middleware/deserialaizeUser";
import requireUser from "../middleware/requireUser";

const movieRouter = Router();

movieRouter.get("/wanna-see", [deserialaizeUser, requireUser], sendFavoriteMoviesIdList);
movieRouter.get("/", [deserialaizeUser, requireUser], sendFavoriteMovies);
movieRouter.get("/titles", [deserialaizeUser, requireUser], sendTitlesController);
movieRouter.delete("/wanna-see/:id", [deserialaizeUser, requireUser], deleteMovieFromWannaSeeList);
movieRouter.post("/wanna-see", [deserialaizeUser, requireUser], addMovieToWannaSeeList);

export default movieRouter;
