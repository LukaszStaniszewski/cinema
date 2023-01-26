import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Movie } from "@core/movie/movie.service";

@Component({
  selector: "app-card[movie]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() movie!: Movie;
  @Output() newMovieId = new EventEmitter<string>();

  handleDoesntIntrestMeButtonEvent(movieId: string) {
    this.newMovieId.emit(movieId);
  }
}
