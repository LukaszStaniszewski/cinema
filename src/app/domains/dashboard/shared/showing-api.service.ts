import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "@core/movie/movie.service";
import { API } from "src/environments/constants";

export type Availability = {
  time: string;
  cinemaRoomId: RoomId;
  reservationId: string;
};

export type Showing = {
  movie: Movie;
  available: Availability[];
};

export type ShowingPartial = {
  title: string;
  day: string;
  image: string;
  time: string;
};

type RoomId = "room-a" | "room-b" | "room-c";
@Injectable({
  providedIn: "root",
})
export class ShowingApiService {
  constructor(private http: HttpClient) {}

  getShowings(date: string | number) {
    return this.http.get<Showing[]>(`${API.SHOWINGS}?day=${date}`);
  }

  getShowingPartial(reservationId: string) {
    return this.http.get<ShowingPartial>(`${API.SHOWINGS}/${reservationId}`);
  }
}
