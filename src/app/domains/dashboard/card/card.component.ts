import { Component, inject, Input } from "@angular/core";
import { MovieService } from "@core/movie/movie.service";

import type { Showing } from "../services/showing-state.service";

@Component({
  selector: "app-card[showing]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  isLoading = false;
  @Input() showing!: Showing;

  private movieService = inject(MovieService);
  get movie() {
    return this.showing.movie;
  }
  get hours() {
    return this.showing.available;
  }

  addToFavorites() {
    this.movieService.addToFavorites("2", this.showing.movie.id);
  }
}
