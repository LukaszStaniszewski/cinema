import { AfterContentInit, Component, ElementRef, inject, Input, ViewChild } from "@angular/core";
import { MovieService } from "@core/movie/movie.service";

@Component({
  selector: "app-card-customer",
  template: `
    <app-rating [max]="10" [rate]="rate" (rateChange)="rateMovie($event)"></app-rating>

    <button #addToWannaSee class="card-btn btn" (click)="addToFavorites()">Chcę zobaczyć</button>
  `,
  styleUrls: ["./card-section.component.css"],
})
export class CardCustomerSectionComponent implements AfterContentInit {
  @ViewChild("addToWannaSee", { static: true })
  buttonElement!: ElementRef<HTMLButtonElement>;
  @Input() movieId!: string;
  @Input() rate!: number;
  private movieService = inject(MovieService);

  ngAfterContentInit() {
    this.movieService.movieService$.subscribe(watchListIds => {
      if (watchListIds.includes(this.movieId)) {
        this.buttonElement.nativeElement.disabled = true;
        this.buttonElement.nativeElement.textContent = "Juz dodany!";
        this.buttonElement.nativeElement.classList.add("btn--disabled");
      }
    });
  }

  rateMovie(rating: number) {
    this.movieService.addRate(rating, this.movieId);
  }

  addToFavorites() {
    this.movieService.addToFavorites(this.movieId);
  }
}
