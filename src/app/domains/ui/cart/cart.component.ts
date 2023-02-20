import { CdkMenuModule } from "@angular/cdk/menu";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AppStateWithBookingState, BookingTicketActions } from "@domains/booking/store";
import { Store } from "@ngrx/store";
import { ClickOutsideDirective, useNavigate } from "@shared/index";

import { CartStateService } from "./cart-state.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, ClickOutsideDirective, CdkMenuModule],
  standalone: true,
  providers: [CartStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent implements OnInit {
  isOpen = false;
  redirectUrl = "";

  private cartService = inject(CartStateService);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private navigate = useNavigate();

  vm$ = this.cartService.selectCartItems$;
  ngOnInit() {
    this.cartService.fetchReservedOrders();
  }

  redirect(url: string) {
    this.redirectUrl = url;
    this.store.dispatch(BookingTicketActions.resetState());
    this.navigate(this.redirectUrl);
  }

  removeCartItem(event: Event, id: string) {
    event.stopPropagation();

    this.cartService.delete(id);
  }

  closeDropdown() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
