import { Component, inject } from "@angular/core";
import { MovieService } from "@core/movie/movie.service";
type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  pg: string;
  descriptionShort: string;
  descriptionLong: string;
  descriptionExtra: {
    cast: string[];
  };
  rating: string;
  votesNumber: number;
  premiere: boolean;
  runTime: number;
};
@Component({
  selector: "app-wanna-see",
  templateUrl: "./wanna-see.component.html",
  styleUrls: ["./wanna-see.component.css"],
})
export class WannaSeeComponent {
  private movieService = inject(MovieService);
  vm$ = this.movieService.getFavoriteMovies();
}
