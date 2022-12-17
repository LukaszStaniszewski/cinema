import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, pipe, ReplaySubject } from 'rxjs';
import { API } from 'src/environments/constants';
import { Maybe } from '../user/authentication.service';

export interface Reservation {
  id: string;
  cinemaRoomId: string;
  movieTitle: string;
  takenSeats: Seat[];
}

export type CinemaRoom = {
  id: string;
  seats: Seat[][];
};

export type Seat = {
  position: { column: string; row: string };
  isBusy: boolean;
  status: 'standard' | 'vip';
};

interface Movie {
  id: string;
  title: string;
  image: string;
  genre: string;
  pg: string;
  descriptionShort: string;
  descriptionLong: string;
  descriptionExtra: {
    actors: string[];
  };
  rating: string;
  votesNumber: number;
  premiere: boolean;
  runTime: number;
}

export type Reperoire = {
  movie: Movie;
  // movieId: 'string';
  day: '06-12-2022';
  hours: [
    { time: string; cinemaRoomId: RoomId; reservationId: string },
    { time: string; cinemaRoomId: RoomId; reservationId: string },
    { time: string; cinemaRoomId: RoomId; reservationId: string }
  ];
};

type RoomId = 'room-a' | 'room-b' | 'room-c';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isLoading = true;
  movies: Maybe<Reservation[]>;
  movie$$: BehaviorSubject<Maybe<Reservation>>;
  showing$$: BehaviorSubject<Maybe<Reservation>>;
  reperoire$$: BehaviorSubject<Maybe<Reperoire[]>>;
  private cinemaRoom$$ = new BehaviorSubject<Maybe<CinemaRoom>>(null);
  private reservedSeats$$ = new BehaviorSubject<Maybe<Seat>>(null);
  constructor(private http: HttpClient) {
    this.movie$$ = new BehaviorSubject<Maybe<Reservation>>(null);
    this.showing$$ = new BehaviorSubject<Maybe<Reservation>>(null);
    this.reperoire$$ = new BehaviorSubject<Maybe<Reperoire[]>>(null);
  }

  get cinemaRoom$() {
    return this.cinemaRoom$$.asObservable();
  }
  fetchMovies() {
    // return this.http.get<Movie[]>(API.MOVIES);
    this.http
      .get<Reservation[] | undefined>(API.SHOWINGS)
      .subscribe((movies) => {
        this.movies = movies;
        // console.log(movies);
        this.isLoading = false;
      });
  }

  fetchShowing(id: string | number) {
    // this.http
    //   .get<Reservation | undefined>(`${API.SHOWINGS}/${id}`)
    //   .subscribe((showing) => {
    //     this.showing$$.next(showing);
    //     console.log(showing);
    //     this.isLoading = false;
    //   });
    // combineLatest([
    //   this.http.get<Maybe<CinemaRoom>>(`${API.CINEMAROOMS}/${id}`),
    //   this.http.get<Maybe<Reservation>>(`${API.SHOWINGS}/${id}`),
    // ]);
    this.http
      .get<Maybe<Reservation>>(`${API.RESERVATIONS}/${id}`)
      .subscribe((showing) => {
        this.showing$$.next(showing);
        this.http
          .get<Maybe<CinemaRoom>>(
            `${API.CINEMAROOMS}?id=${showing?.cinemaRoomId}`
          )
          .subscribe((cinemaRoom) => {
            if (!cinemaRoom || !showing) return;
            const updatedCinemaRoom = this.mapCinemaRoomSeats(
              cinemaRoom,
              showing?.takenSeats
            );
            // console.log(updatedCinemaRoom);
            if (updatedCinemaRoom) {
              this.cinemaRoom$$.next(updatedCinemaRoom);
            } else {
              this.cinemaRoom$$.next(cinemaRoom);
            }
          });
      });
  }

  updateSeats(seatToUpdate: Seat) {
    const adjustSeat = [{ ...seatToUpdate, isBusy: !seatToUpdate.isBusy }];
    const cinemaRoom = this.cinemaRoom$$.value;
    if (!cinemaRoom) return;
    const updatedCinemaRoom = this.mapCinemaRoomSeats(cinemaRoom, adjustSeat);
    this.cinemaRoom$$.next(updatedCinemaRoom);
  }

  private mapCinemaRoomSeats(cinemaRoom: CinemaRoom, seatsToUpdate: Seat[]) {
    const takenSeats = seatsToUpdate;
    let updatedCinemaRoom = cinemaRoom;

    cinemaRoom.seats.map((column) => {
      column.forEach((row, rowIndex, array) => {
        if (
          takenSeats.find(
            (seat) =>
              seat?.position?.column === row?.position?.column &&
              seat?.position?.row === row?.position?.row
          )
        ) {
          array[rowIndex] = takenSeats.find(
            (seat) =>
              seat.position?.column === row.position?.column &&
              seat.position?.row === row.position?.row
          ) as Seat;
        }
      });
    });

    return updatedCinemaRoom;
  }

  fetchReperoire(date: string | number) {
    this.http
      .get<Reperoire[] | undefined>(`${API.SHOWINGS}?day=${date}`)
      .subscribe((reporoire) => {
        this.reperoire$$.next(reporoire);
        this.isLoading = false;
      });
  }
  addToFavorites() {
    // if user logged in post request
    // else add to local storage
  }
}
