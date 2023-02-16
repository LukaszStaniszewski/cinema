import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ClickOutsideDirective } from "@shared/index";

import { CartStateService } from "./cart-state.service";

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
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, ClickOutsideDirective],
  standalone: true,
  providers: [CartStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent {
  isOpen = false;
  @Input() ShowingsPartial = test;
  private cartService = inject(CartStateService);

  vm$ = this.cartService.selectCartItems$;
  ngOnInit() {
    this.cartService.fetchReservedOrders();
  }

  closeDropdown() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
