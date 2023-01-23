import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, filter, map, of, switchMap, throwError } from "rxjs";
import { API, MESSAGE } from "src/environments/constants";
type Movie = {
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
};

type WannaSeeDTO = {
  userId: string;
  movieId: string;
  id: string;
};

type WannaSee = string[];

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
    this.http
      .get<WannaSeeDTO[] | []>(`${API.WANNA_SEE}?userId=${userId}&movieId=${movieId}`)
      .pipe(
        switchMap(([likedMovie]) => {
          if (likedMovie) {
            return throwError(() => MESSAGE.WANNA_SEE_FAILURE);
          }
          return this.http.post(
            API.WANNA_SEE,
            { userId, movieId },
            { withCredentials: true }
          );
        })
      )
      .subscribe({
        next: () => MESSAGE.WANNA_SEE_SUCCESS,
        error: error => error,
      });
  }

  getFavoriteMovies() {
    return this.http.get<WannaSeeDTO[]>(`${API.WANNA_SEE}/${2}`).pipe(
      switchMap(wannaSeeDTO => {
        const query = wannaSeeDTO
          .map(wannaSee => wannaSee.movieId)
          .filter(Boolean)
          .join("&id=");
        return this.http.get<Movie[]>(`${API.MOVIES}?id=${query}`);
      })
    );
  }

  getFavoriteMoviesId(userId: string) {
    this.http
      .get<WannaSeeDTO[]>(`${API.WANNA_SEE}/${userId}`)
      .pipe(map(arg => arg.map(movie => movie.movieId).filter(Boolean)))
      .subscribe(movies => this.movieServiceState$$.next(movies));
    // this.http.get<WannSee[]>(`${API.WANNA_SEE}/${userId}`).subscribe(console.log);
  }
}
