import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { API, MESSAGE } from "src/environments/constants";

type Cast = {
  name: string;
  image: string;
};
export type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  pg: string;
  director: string;
  description: string;
  descriptionExtra: {
    cast: Cast[];
  };
  rating: string;
  votesNumber: number;
  premiere: Date;
  runTime: number;
  userRate?: string;
};

type WannaSeeDTO = {
  userId: string;
  movieId: string;
  id: string;
};

@Injectable({
  providedIn: "root",
})
export class WatchListService {
  private movieServiceState$$ = new BehaviorSubject<string[]>([]);
  private http = inject(HttpClient);

  get movieService$() {
    return this.movieServiceState$$.asObservable();
  }

  add(movieId: string) {
    this.http.post(API.WANNA_SEE, { movieId }).subscribe({
      next: () => MESSAGE.WANNA_SEE_SUCCESS,
      error: error => error,
    });
  }

  addRate(rating: number, movieId: string) {
    this.http.post(API.WANNA_SEE, { movieId, rating }).subscribe({
      next: () => MESSAGE.WANNA_SEE_SUCCESS,
      error: error => error,
    });
  }

  getFavorites() {
    return this.http.get<Movie[]>(`${API.MOVIES}`);
  }

  delete(movieId: string) {
    this.http.delete(`${API.WANNA_SEE}/${movieId}`).subscribe(console.log);
  }
  getFavoriteId() {
    this.http
      .get<string[]>(`${API.WANNA_SEE}`)

      .subscribe({
        next: ids => this.movieServiceState$$.next(ids),
        error: error => error,
      });
  }
}
