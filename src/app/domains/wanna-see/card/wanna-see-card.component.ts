import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Movie } from "@core/movie/movie.service";

@Component({
  selector: "app-wanna-see-card[movie]",
  templateUrl: "./wanna-see-card.component.html",
  styleUrls: ["./wanna-see-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WannaSeeCardComponent {
  @Input() movie!: Movie;
  @Output() newMovieId = new EventEmitter<string>();

  handleDoesntIntrestMeButtonEvent(movieId: string) {
    this.newMovieId.emit(movieId);
  }
}
