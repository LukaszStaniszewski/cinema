import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { switchMap, throwError } from "rxjs";
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

type WannSee = {
  userId: string;
  movieId: string;
  id: string;
};

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private http = inject(HttpClient);
  addToFavorites(userId: string, movieId: string) {
    this.http
      .get<WannSee[] | []>(`${API.WANNA_SEE}?userId=${userId}&movieId=${movieId}`)
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

  getFavoriteMovies(userId: string) {
    this.http.get(`${API.WANNA_SEE}/${userId}`).subscribe(console.log);
  }
}
