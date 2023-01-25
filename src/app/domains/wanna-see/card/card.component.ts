import { Component, Input, Output } from "@angular/core";
import { Movie } from "@core/movie/movie.service";

@Component({
  selector: "app-card[movie]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  @Input() movie!: Movie;
  // @Output()
}
