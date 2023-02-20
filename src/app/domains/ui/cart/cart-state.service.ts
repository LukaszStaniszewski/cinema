import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AppStateWithBookingState, selectTicketsWithShowingPartialAndUrl } from "@domains/booking/store";
import { ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject, map, take } from "rxjs";

type CartItem = {
  showingPartial: ShowingPartial;
  url: string;
  orderId?: string;
};

type CartState = {
  cartItems: CartItem[];
};

@Injectable()
export class CartStateService {
  private cartState$$ = new BehaviorSubject<CartState>({ cartItems: [] });
  private http = inject(HttpClient);
  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor() {
    this.store
      .select(selectTicketsWithShowingPartialAndUrl)
      .pipe(
        map(select => {
          if (select.tickets.length > 0) return select;
          if (select.showingPartial) this.deleteLocaly(select.showingPartial.reservationId);
          return;
        })
      )
      .subscribe({
        next: item => {
          if (item?.showingPartial) {
            this.add({ showingPartial: item.showingPartial, url: item.url });
          }
        },
        error: error => error,
      });
  }

  get selectCartItems$() {
    return this.cartState$$.pipe(map(cart => cart.cartItems));
  }

  add(order: CartItem) {
    const isExisting = this.cartState$$.value.cartItems?.some(
      ({ showingPartial }) => showingPartial.reservationId === order.showingPartial.reservationId
    );
    if (isExisting) return;
    this.cartState$$.next({
      cartItems: [
        ...this.cartState$$.value.cartItems,
        { showingPartial: order.showingPartial, url: order.url, orderId: "" },
      ],
    });
  }

  delete(reservationId: string) {
    this.deleteLocaly(reservationId);
    this.deleteInDB(reservationId);
  }

  private deleteLocaly(reservationId: string) {
    this.cartState$$.next({
      cartItems: this.cartState$$.value.cartItems.filter(
        item => item.showingPartial.reservationId !== reservationId
      ),
    });
  }

  private deleteInDB(reservationId: string) {
    this.http.delete(`${API.ORDERS}/${reservationId}`).subscribe();
  }

  fetchReservedOrders() {
    this.http
      .get<CartItem[]>(API.ORDERS)
      .pipe(take(1))
      .subscribe({
        next: cartItems => this.cartState$$.next({ cartItems }),

        error: error => error,
      });
  }
}
