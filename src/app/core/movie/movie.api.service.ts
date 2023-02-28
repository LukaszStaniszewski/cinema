import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of } from "rxjs";
import { API } from "src/environments/constants";

import { Movie } from "./movie.interface";

type TitlesAndRunTimeDTO = { title: string; runTime: number }[];

@Injectable({
  providedIn: "root",
})
export class MovieApiService {
  private http = inject(HttpClient);

  addToDB(movie: Movie) {
    return this.http.post(API.MOVIES, movie);
  }

  getTitlesAndRunTime() {
    return this.http.get<TitlesAndRunTimeDTO>(API.MOVIES_TITLE).pipe(catchError(() => of([])));
  }
}
