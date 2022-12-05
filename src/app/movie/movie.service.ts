import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API } from 'src/environments/constants';
import { Maybe } from '../user/authentication.service';

export interface Showing {
  id: string;
  cinemaRoomId: string;
  date: {
    day: 'string';
    time: 'string';
  };
  movie: Movie;
}
[];

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

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  isLoading = true;
  movies: Maybe<Showing[]>;
  movie$$: BehaviorSubject<Maybe<Showing>>;
  showings$$: BehaviorSubject<Maybe<Showing[]>>;
  constructor(private http: HttpClient) {
    this.movie$$ = new BehaviorSubject<Maybe<Showing>>(null);
    this.showings$$ = new BehaviorSubject<Maybe<Showing[]>>(null);
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

  fetchShowings(date: string | number) {
    this.http
      .get<Showing[] | undefined>(`${API.SHOWINGS}?date.day=${date}`)
      .subscribe((showing) => {
        this.showings$$.next(showing);
        this.isLoading = false;
      });
  }
  addToFavorites() {
    // if user logged in post request
    // else add to local storage
  }
}
