import { Request, Response } from "express";
import fs from "fs";

import { ErrorMessage, SuccessMessage } from "../config/constants.config";
import db from "../db/db.json";
import getErrorMessage from "../utils/getErrorMessage";

type WannaSee = {
  userId: string;
  movieId: string;
  id: string;
};

export const sendFavoriteMoviesIdList = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;

    const wannaSeeIdList = db["wanna-see"]
      .filter(wannaSee => wannaSee.userId == userId)
      .map(wannaSee => wannaSee.movieId);
    if (!wannaSeeIdList) {
      throw new Error(ErrorMessage.WANNA_SEE_NOT_FOUND);
    }
    res.json(wannaSeeIdList);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendFavoriteMovies = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const wannaSeeIdList = db["wanna-see"]
      .filter(wannaSee => wannaSee.userId == userId)
      .map(wannaSee => wannaSee.movieId);

    if (!wannaSeeIdList) {
      throw new Error("given user doesn't have wanna see movies");
    }
    const favoriteMovies = db.movies.filter(movie => {
      return wannaSeeIdList.some(wannaSee => movie.id == wannaSee);
    });
    if (!favoriteMovies) {
      throw new Error(ErrorMessage.WANNA_SEE_NOT_FOUND);
    }
    res.json(favoriteMovies);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const deleteMovieFromWannaSeeList = (req: Request<{ id: string }>, res: Response) => {
  const movieId = req.params.id;

  const currentUserId = res.locals.user.id;
  try {
    const withoutUnwantedMovie = db["wanna-see"]
      .map(wannaSee => {
        if (wannaSee.movieId == movieId && wannaSee.userId == currentUserId) {
          return undefined;
        }
        return wannaSee;
      })
      .filter(Boolean) as WannaSee[];
    if (!withoutUnwantedMovie) {
      throw new Error("Movie couldn't be found");
    }
    db["wanna-see"] = withoutUnwantedMovie;
    fs.writeFile("./src/db/db.json", JSON.stringify(db, null, 2), err => {
      throw new Error(`file couldn't be overwritten: ${err}`);
    });
    res.json(SuccessMessage.WANNA_SEE_DELETED);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const addMovieToWannaSeeList = (
  req: Request<Record<string, unknown>, Record<string, unknown>, { movieId: string }>,
  res: Response
) => {
  console.log("hit");
  const movieId = req.body.movieId;
  const currentUserId = res.locals.user.id;
  const wannaSeeId = movieId + currentUserId;
  try {
    const doesExist = db["wanna-see"].some(value => value.id == wannaSeeId);
    if (doesExist) throw new Error("Movie is already on the list");
    const wannaSeeDb = db["wanna-see"];
    wannaSeeDb.push({
      userId: currentUserId,
      movieId: movieId,
      id: movieId + currentUserId,
    });

    if (!wannaSeeDb) {
      throw new Error(ErrorMessage.MOVIE_NOT_ADDED);
    }
    db["wanna-see"] = wannaSeeDb;
    fs.writeFile("./src/db/db.json", JSON.stringify(db, null, 2), err => {
      throw new Error(`file couldn't be overwritten: ${err}`);
    });
    res.json(SuccessMessage.MOVIE_ADDED);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendTitlesController = (req: Request, res: Response) => {
  try {
    const movies = db.movies;
    const titles: { title: string; runTime: number }[] = movies.map(movie => ({
      title: movie.title,
      runTime: movie.runTime,
    }));
    res.json(titles);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const addUserMovieRating = (
  req: Request<Record<string, unknown>, Record<string, unknown>, { movieId: string; rate: string }>,
  res: Response
) => {
  try {
    const { rate, movieId } = req.body;
    const currentUserId = res.locals.user.id.toString();
    let ratings = db.ratings;
    const isExisting = ratings.some(rate => rate.movieId == movieId && rate.userId == currentUserId);
    if (isExisting) {
      ratings = ratings.filter(rate => rate.movieId != movieId);
    }
    ratings.push({ rate: rate.toString(), movieId, userId: currentUserId });

    db.ratings = ratings;
    fs.writeFile("./src/db/db.json", JSON.stringify(db, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
    });

    res.status(200).json("Rate was added");
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
