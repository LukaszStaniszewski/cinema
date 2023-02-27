import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, of } from "rxjs";
import { API, MESSAGE } from "src/environments/constants";

type Actors = {
  name: string;
  image: string;
};

export interface Movie {
  title: string;
  image: string;
  genre: string;
  pg: string;
  director: string;
  description: string;
  actors: string[];
  runTime: number;
  premiere: boolean;
}
export interface MovieDto extends Movie {
  id: string;
  descriptionExtra: {
    actors: Actors[];
  };
  rating: string;
  votesNumber: number;

  runTime: number;
}

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
