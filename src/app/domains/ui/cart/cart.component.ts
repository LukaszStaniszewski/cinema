import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

const test = [
  {
    title: "The Dark Knight",
    day: "06-12-2022",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    time: "14:00",
  },
  {
    title: "Avatar: Istota Wody",
    day: "06-12-2022",
    image:
      "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
    time: "14:00",
  },
];
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent {
  @Input() ShowingsPartial = test;
}
