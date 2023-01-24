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
  movieMock = [
    {
      id: "movie-avatar-way-of-water-123",
      title: "Avatar: Istota Wody",
      image:
        "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
      descriptionShort:
        "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their planet.",
      rating: 8,
      votesNumber: 432,
      runTime: 192,
      pg: 13,
      genre: "Sci-Fi",
      director: "James Cameron",
      premiere: "16:12:2022 20:00:00",
      descriptionExtra: {
        cast: [
          { name: "Sam Worthington" },
          { name: "Zoe Saldana" },
          { name: "Sigourney Weeaver" },
          { name: "Stephen Lang" },
          { name: "Kate Winslet" },
        ],
      },
    },
  ];
  // vm$ = this.movieService.getFavoriteMovies();

  // ngOnInit() {
  // }
}
