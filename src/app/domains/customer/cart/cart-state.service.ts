import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  AppStateWithBookingState,
  BookingTicketActions,
  selectTicketsWithShowingPartialAndUrl,
} from "@domains/booking/store";
import { ShowingPartial } from "@domains/dashboard";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { BehaviorSubject, map, take } from "rxjs";

type CartItem = {
  showingPartial: ShowingPartial;
  url: string;
};

type CartState = {
  cartItems: Map<string, CartItem>;
};

@Injectable()
export class CartStateService {
  private cartState$$ = new BehaviorSubject<CartState>({ cartItems: new Map() });
  private http = inject(HttpClient);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private toast = inject(ToastStateService);

  constructor() {
    this.store
      .select(selectTicketsWithShowingPartialAndUrl)
      .pipe(
        map(({ tickets, ...item }) => {
          if (!item.showingPartial) throw new Error();
          if (tickets.length > 0) {
            this.add({ showingPartial: item.showingPartial, url: item.url });
          } else {
            this.deleteLocaly(item.showingPartial.reservationId);
          }
        })
      )
      .subscribe({
        next: () => this.toast.activate({ message: MESSAGE.CART_ADD_SUCCESS, status: "success" }),
        error: () => this.toast.activate({ message: MESSAGE.CART_ADD_FAILURE, status: "warning" }),
      });
  }

  get selectCartItems$() {
    return this.cartState$$.pipe(map(cart => cart.cartItems));
  }

  add(item: CartItem) {
    const reservationId = item.showingPartial.reservationId;
    const isExisting = this.cartState$$.value.cartItems?.has(reservationId);

    if (isExisting) return;
    this.cartState$$.next({ cartItems: new Map(this.cartState$$.value.cartItems).set(reservationId, item) });
  }

  delete(reservationId: string, url: string) {
    this.deleteLocaly(reservationId);
    this.deleteInDB(reservationId);
    if (this.isItemOnOpenedReservationPage(url, reservationId)) {
      this.store.dispatch(BookingTicketActions.removeTickets());
    }
  }

  private deleteLocaly(reservationId: string) {
    this.cartState$$.value.cartItems.delete(reservationId);
  }

  private deleteInDB(reservationId: string) {
    this.http.delete(`${API.ORDERS}/${reservationId}`).subscribe();
  }

  private isItemOnOpenedReservationPage(url: string, reservationId: string) {
    const pattern = `reservation/${reservationId}`;
    return new RegExp(pattern).test(url);
  }

  fetchReservedOrders() {
    this.http
      .get<CartItem[]>(API.ORDERS)
      .pipe(take(1))
      .subscribe({
        next: cartItems =>
          this.cartState$$.next({
            cartItems: new Map(cartItems.map(items => [items.showingPartial.reservationId, { ...items }])),
          }),
        error: error => error,
      });
  }
}
