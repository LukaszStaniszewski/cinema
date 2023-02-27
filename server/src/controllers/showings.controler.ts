import { Request, Response } from "express";
import fs from "fs";

import { ErrorMessage } from "../config/constants.config";
import db from "../db/db.json";
import repertuireDB from "../db/repertuire.json";
import getErrorMessage from "../utils/getErrorMessage";

export const sendShowings = async (req: Request, res: Response) => {
  const day = req.query["day"];
  try {
    const showings = db.showings.filter(showing => showing.day === day);
    if (!showings.length) {
      throw new Error(ErrorMessage.SHOWINGS_NOT_FOUND);
    }
    res.json(showings);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendShowingBasis = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservationId = req.params.id;

    const [reservation] = db["reservations"].filter(reservation => reservation.id == reservationId);
    if (!reservation) {
      throw new Error(ErrorMessage.RESERVATION_NOT_FOUND);
    }
    const showingBasis = db.showings
      .filter(({ movie }) => reservation.movieId == movie.id)
      .map(({ movie, day, available }) => {
        return {
          title: movie.title,
          day,
          image: movie.image,
          time: available.find(at => at.reservationId == reservation.id)?.time,
        };
      })[0];
    res.json(showingBasis);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

// type ShowRepertuireVM = {
//  [key: string]:  {cinemaRoomName: string;
//   hour: number;
//   movieTitle: string};
// };
export const sendRepertuireBasis = async (req: Request<{ day: string }>, res: Response) => {
  try {
    console.log("hit");
    const repertuireDay = req.params.day;

    if (doesExist(repertuireDay)) {
      const repertoire = repertuireDB[repertuireDay];
      res.json(repertoire);
    }
    // res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const sendTaken = async (req: Request<{ day: string }>, res: Response) => {
  try {
    const repertuireDay = req.params.day;

    if (doesExist(repertuireDay)) {
      const repertoire = repertuireDB[repertuireDay];
      res.json(repertoire);
    }
    // res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

export const isGivenTermFree = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, { day: string; cinemaRoom: string }>,
  res: Response
) => {
  try {
    const resQuery = req.query as { day: string; cinemaRoom: string };
    const cinemaRoom = resQuery.cinemaRoom;
    const repertuireDay = resQuery.day.replaceAll("/", "-");

    if (doesExist(repertuireDay)) {
      const repertoire = repertuireDB[repertuireDay];

      if (cinemaRoom in repertoire) {
        const takenHours = repertoire[cinemaRoom].map(screening => screening.hour) as sting[];
        res.status(200).json(takenHours);
        return;
      }
    }
    res.json(null);
    // res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};

function doesExist(id: string): id is keyof typeof repertuireDB {
  return id in repertuireDB;
}

export const sendDaysThatHaveAddedRepertuire = (req: Request, res: Response) => {
  try {
    const repertoire = repertuireDB;

    let dates = Object.keys(repertoire);
    if (dates) {
      dates = dates.map(date => date.replaceAll("-", "/"));
    }
    res.json(dates);
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
export type CinemaRoomName = "room-a" | "room-b" | "room-c";

// export type Screening = {
//   [key in CinemaRoomName]: { hour: number; movieTitle: string };
// } & { date: string };
export type Screening = {
  hour: number;
  movieTitle: string;
  date: string;
  cinemaRoom: string;
  runTime: number;
};

export const addShowingToRepertuire = (
  req: Request<Record<string, unknown>, Record<string, unknown>, Screening>,
  res: Response
) => {
  try {
    const { date, ...screening } = req.body;
    const repertuireDay = date.replaceAll("/", "-");
    let repertoire = null;
    if (doesExist(repertuireDay)) {
      // const cinemaRoom = repertuireDB[repertuireDay][screening.cinemaRoom]
      repertoire = {
        [screening.cinemaRoom]: [
          ...repertuireDB[repertuireDay][screening.cinemaRoom],
          { hour: screening.hour, movieTitle: screening.movieTitle, runTime: screening.runTime },
        ],
      };
    } else {
      repertoire = {
        [screening.cinemaRoom]: [
          { hour: screening.hour, movieTitle: screening.movieTitle, runTime: screening.runTime },
        ],
      };
    }

    repertuireDB[repertuireDay] = repertoire;
    fs.writeFile("./src/db/repertuire.json", JSON.stringify(repertuireDB, null, 2), err => {
      // throw new Error(`file couldn't be overwritten: ${err}`);
      return;
    });
    res.end();
  } catch (error) {
    res.status(404).json(getErrorMessage(error));
  }
};
