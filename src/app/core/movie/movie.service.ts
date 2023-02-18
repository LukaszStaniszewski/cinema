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
};

type WannaSeeDTO = {
  userId: string;
  movieId: string;
  id: string;
};

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private movieServiceState$$ = new BehaviorSubject<string[]>([]);
  private http = inject(HttpClient);

  get movieService$() {
    return this.movieServiceState$$.asObservable();
  }

  addToFavorites(userId: string, movieId: string) {
    this.http.post(API.WANNA_SEE, { movieId }).subscribe({
      next: () => MESSAGE.WANNA_SEE_SUCCESS,
      error: error => error,
    });
    // this.http
    //   .get<WannaSeeDTO[] | []>(`${API.WANNA_SEE}?userId=${userId}&movieId=${movieId}`)
    //   .pipe(
    //     switchMap(([likedMovie]) => {
    //       if (likedMovie) {
    //         return throwError(() => MESSAGE.WANNA_SEE_FAILURE);
    //       }
    //       return this.http.post(
    //         API.WANNA_SEE,
    //         { userId, movieId },
    //         { withCredentials: true }
    //       );
    //     })
    //   )
    //   .subscribe({
    //     next: () => MESSAGE.WANNA_SEE_SUCCESS,
    //     error: error => error,
    //   });
  }

  getFavorites() {
    // return this.http.get<WannaSeeDTO[]>(`${API.WANNA_SEE_LIST}/${2}`).pipe(
    //   switchMap(wannaSeeDTO => {
    //     const query = wannaSeeDTO
    //       .map(wannaSee => wannaSee.movieId)
    //       .filter(Boolean)
    //       .join("&id=");
    //     return this.http.get<Movie[]>(`${API.MOVIES}?id=${query}`);
    //   })
    // );
    return this.http.get<Movie[]>(`${API.MOVIES}`);
  }

  deleteFavorite(movieId: string) {
    this.http.delete(`${API.WANNA_SEE}/${movieId}`).subscribe(console.log);
  }
  getFavoriteId() {
    this.http
      .get<string[]>(`${API.WANNA_SEE}`)
      // .pipe(map(arg => arg.map(movie => movie.movieId).filter(Boolean)))
      .subscribe({
        next: ids => this.movieServiceState$$.next(ids),
        error: error => error,
      });
    // this.http.get<WannSee[]>(`${API.WANNA_SEE}/${userId}`).subscribe(console.log);
  }
}
