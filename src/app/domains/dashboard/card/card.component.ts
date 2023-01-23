import {
  AfterContentInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from "@angular/core";
import { MovieService } from "@core/movie/movie.service";

import type { Showing } from "../services/showing-state.service";

@Component({
  selector: "app-card[showing]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements AfterContentInit {
  isLoading = false;
  @ViewChild("addToWannaSee", { static: true })
  buttonElement!: ElementRef<HTMLButtonElement>;
  @Input() showing!: Showing;

  private movieService = inject(MovieService);

  ngAfterContentInit() {
    this.movieService.movieService$.subscribe(wannaSee => {
      if (wannaSee.includes(this.showing.movie.id)) {
        this.buttonElement.nativeElement.disabled = true;
        this.buttonElement.nativeElement.textContent = "Juz dodany!";
      }
    });
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
