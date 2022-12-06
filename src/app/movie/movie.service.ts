import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, pipe, ReplaySubject } from 'rxjs';
import { API } from 'src/environments/constants';
import { Maybe } from '../user/authentication.service';

export interface Showing {
  id: string;
  cinemaRoomId: string;
  movieTitle: string;
  takenSeats: {
    position: { column: 'A'; row: 1 };
    isBusy: boolean;
  }[];
}

export type CinemaRoom = {
  id: string;
  seats: Seat[];
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
    { time: string; cinemaRoomId: RoomId; showingId: string },
    { time: string; cinemaRoomId: RoomId; showingId: string },
    { time: string; cinemaRoomId: RoomId; showingId: string }
  ];
};

type RoomId = 'room-a' | 'room-b' | 'room-c';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isLoading = true;
  movies: Maybe<Showing[]>;
  movie$$: BehaviorSubject<Maybe<Showing>>;
  showing$$: BehaviorSubject<Maybe<Showing>>;
  reperoire$$: BehaviorSubject<Maybe<Reperoire[]>>;
  cinemaRoom$$: BehaviorSubject<Maybe<CinemaRoom>>;
  constructor(private http: HttpClient) {
    this.movie$$ = new BehaviorSubject<Maybe<Showing>>(null);
    this.showing$$ = new BehaviorSubject<Maybe<Showing>>(null);
    this.reperoire$$ = new BehaviorSubject<Maybe<Reperoire[]>>(null);
    this.cinemaRoom$$ = new BehaviorSubject<Maybe<CinemaRoom>>(null);
  }

  fetchMovies() {
    // return this.http.get<Movie[]>(API.MOVIES);
    this.http.get<Showing[] | undefined>(API.SHOWINGS).subscribe((movies) => {
      this.movies = movies;
      // console.log(movies);
      this.isLoading = false;
    });
  }

  // fetchMovie(id: string | number) {
  //   this.http
  //     .get<Movie | undefined>(`${API.SHOWINGS}/${id}`)
  //     .subscribe((movie) => {
  //       this.movie$$.next(movie);
  //       this.isLoading = false;
  //     });
  // }

  fetchShowing(id: string | number) {
    // this.http
    //   .get<Showing | undefined>(`${API.SHOWINGS}/${id}`)
    //   .subscribe((showing) => {
    //     this.showing$$.next(showing);
    //     console.log(showing);
    //     this.isLoading = false;
    //   });
    // combineLatest([
    //   this.http.get<Maybe<CinemaRoom>>(`${API.CINEMAROOMS}/${id}`),
    //   this.http.get<Maybe<Showing>>(`${API.SHOWINGS}/${id}`),
    // ]);
    this.http
      .get<Maybe<Showing>>(`${API.SHOWINGS}/${id}`)
      .subscribe((showing) => {
        this.showing$$.next(showing);
        this.http
          .get<Maybe<CinemaRoom>>(
            `${API.CINEMAROOMS}?id=${showing?.cinemaRoomId}`
          )
          .subscribe((cinemaRoom) => {
            this.cinemaRoom$$.next(cinemaRoom);
          });
      });
  }

  fetchReperoire(date: string | number) {
    this.http
      .get<Reperoire[] | undefined>(`${API.REPEROIRE}?day=${date}`)
      .subscribe((reporoire) => {
        this.reperoire$$.next(reporoire);
        this.isLoading = false;
      });
    console.log(this.reperoire$$.value);
    // this.http
    //   .get<Reperoire[] | undefined>(`${API.REPEROIRE}?day=${date}`)
    //   .subscribe((reporoires) => {
    //     if (!reporoires) return;
    //     for (let reporoire of reporoires) {
    //       this.http
    //         .get<Movie | undefined>(`${API.MOVIES}/${reporoire?.movieId}`)
    //         .pipe(map((movie) => ({ movie, ...reporoire })))
    //         .subscribe((movie) => {
    //           this.reperoire$$.next([{ ...movie, ...reporoire }]);
    //           console.log(movie);
    //         });
    //       // this.reperoire$$.closed();
    //       console.log(this.reperoire$$.subscribe(console.log));
    //     }
    //     // this.reperoire$$.next(reporoire);
    //     this.isLoading = false;
    //     // console.log(this.reperoire$$.value);
    //   });
    // combineLatest([
    //   this.http.get<Reperoire[] | undefined>(`${API.REPEROIRE}?day=${date}`),
    //   this.http.get<Movie[] | undefined>(`${API.MOVIES}`),
    // ])
    //   .pipe(map((event) => ))
    //   .subscribe();
  }
  addToFavorites() {
    // if user logged in post request
    // else add to local storage
  }
}
