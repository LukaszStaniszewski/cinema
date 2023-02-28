import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from "@angular/core";
import { WatchListService } from "@core/movie/watch-list.service";

@Component({
  selector: "app-card-customer",
  template: `
    <app-rating [max]="10" [rate]="rate" [id]="movieId" (rateChange)="rateMovie($event)"></app-rating>

    <button #addToWannaSee class="card-btn btn" (click)="addToFavorites()">Chcę zobaczyć</button>
  `,
  styleUrls: ["./card-section.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCustomerSectionComponent implements AfterContentInit {
  @ViewChild("addToWannaSee", { static: true }) buttonElement!: ElementRef<HTMLButtonElement>;
  @Input() movieId!: string;
  @Input() rate!: number;

  private watchListService = inject(WatchListService);

  ngAfterContentInit() {
    this.watchListService.movieService$.subscribe(watchListIds => {
      if (watchListIds.includes(this.movieId)) {
        this.buttonElement.nativeElement.disabled = true;
        this.buttonElement.nativeElement.textContent = "Juz dodany!";
        this.buttonElement.nativeElement.classList.add("btn--disabled");
      }
    });
  }

  rateMovie(rating: number) {
    this.watchListService.addRate(rating, this.movieId);
  }

  addToFavorites() {
    this.watchListService.add(this.movieId);
  }
}
