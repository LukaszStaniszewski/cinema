import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
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
@Injectable({
  providedIn: "root",
})
export class MovieService {
  private http = inject(HttpClient);
  addToFavorites(userId: string, movieId: string) {
    this.http.post("", "");
  }

  getFavoriteMovies(userId: string) {
    this.http.get("/wanna-see").subscribe(console.log);
  }
}
