import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "@core/movie/movie.service";
import { API } from "src/environments/constants";

export type Availability = {
  // movieId: 'string';
  time: string;
  cinemaRoomId: RoomId;
  reservationId: string;
};

export type Showing = {
  movie: Movie;
  available: Availability[];
};

type RoomId = "room-a" | "room-b" | "room-c";
@Injectable()
export class ShowingStateService {
  constructor(private http: HttpClient) {}

  getShowings(date: string | number) {
    return this.http.get<Showing[]>(`${API.SHOWINGS}?day=${date}`);
  }
}
