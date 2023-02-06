import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "@core/movie/movie.service";

import { ShowingApiService } from "..";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private showingService: ShowingApiService,
    private movieService: MovieService
  ) {}

  vm = this.showDefaultPage();
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params["day"]) return;
      const adjustedDate = params["day"].replaceAll("/", "-");
      this.vm = this.showingService.getShowings(adjustedDate);
    });

    this.movieService.getFavoriteMoviesId();
  }

  private showDefaultPage() {
    return this.showingService.getShowings("06-12-2022");
  }
}
