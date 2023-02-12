import { AfterContentInit, Component, ElementRef, inject, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "@core/movie/movie.service";
import { v4 as uuidv4 } from "uuid";

import type { Showing } from "../shared/showing-api.service";

@Component({
  selector: "app-card[showing]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements AfterContentInit {
  isLoading = false;
  id = uuidv4();
  @ViewChild("addToWannaSee", { static: true })
  buttonElement!: ElementRef<HTMLButtonElement>;
  @Input() showing!: Showing;

  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngAfterContentInit() {
    this.movieService.movieService$.subscribe(wannaSee => {
      if (wannaSee.includes(this.showing.movie.id)) {
        this.buttonElement.nativeElement.disabled = true;
        this.buttonElement.nativeElement.textContent = "Juz dodany!";
      }
    });
    // this.router.cre
  }
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
