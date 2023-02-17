import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  AppStateWithBookingState,
  selectTicketsWithShowingPartial,
  selectTicketsWithShowingPartialAndUrl,
} from "@domains/booking/store";
import { ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject, catchError, EMPTY, map, of, skipWhile, take } from "rxjs";
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
          console.log("select in cart state", select);
          if (select.tickets.length > 0) return select;
          if (select.showingPartial) {
            this.deleteLocaly(select.showingPartial.reservationId);
          }
          return;
        })
      )
      .subscribe({
        next: item => {
          if (item?.showingPartial)
            this.add({ showingPartial: item.showingPartial, url: item.url });
        },
        error: error => error,
      });

    this.cartState$$.subscribe(value => console.log("ticke sub", value));
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
    // this.deleteInDB(itemId);
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
        next: cartItems => this.patchState(cartItems),
        // next: cartItems => this.cartState$$.next({ cartItems: cartItems, text: "" }),
        error: error => error,
      });
  }

  private patchState(stateSlice: CartItem[]) {
    // if (this.cartState$$.value.cartItems) {
    //   this.cartState$$.next({
    //     ...this.cartState$$.value,
    //     cartItems: [...this.cartState$$.value.cartItems, ...stateSlice],
    //   });
    // } else {
    this.cartState$$.next({
      ...this.cartState$$.value,
      cartItems: stateSlice,
    });
    // }
  }
}
