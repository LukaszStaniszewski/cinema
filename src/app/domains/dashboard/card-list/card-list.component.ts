import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "@core/movie/movie.service";

import { ShowingStateService } from "..";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private showings: ShowingStateService,
    private movieService: MovieService
  ) {}

  vm = this.showDefaultPage();
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params["day"]) return;
      const adjustedDate = params["day"].replaceAll("/", "-");
      this.vm = this.showings.getShowings(adjustedDate);
    });

    this.movieService.getFavoriteMoviesId("2");
  }

  private showDefaultPage() {
    return this.showings.getShowings("06-12-2022");
  }
}
