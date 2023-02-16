import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AppStateWithBookingState, selectTicketsWithShowingPartial } from "@domains/booking/store";
import { ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject, catchError, map, of, skipWhile, take } from "rxjs";
type CartDTO = {
  showingPartial: ShowingPartial;
  url: string;
  orderId?: string;
};

type CartState = {
  cartItems: CartDTO[];
};

@Injectable()
export class CartStateService {
  private cartState$$ = new BehaviorSubject<CartState>({ cartItems: [] });
  private http = inject(HttpClient);
  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor() {
    this.store
      .select(selectTicketsWithShowingPartial)
      .pipe(
        skipWhile(state => state.tickets.length === 0),
        catchError(error => of(error))
      )
      .subscribe(({ showingPartial }) => {
        this.add(showingPartial);
      });

    this.cartState$$.subscribe(console.log);
  }

  get selectCartItems$() {
    return this.cartState$$.pipe(map(cart => cart.cartItems));
  }

  add(order: ShowingPartial) {
    const isExisting = this.cartState$$.value.cartItems?.some(
      ({ showingPartial }) => showingPartial.reservationId === order.reservationId
    );
    if (isExisting) return;
    this.cartState$$.next({
      cartItems: [
        ...this.cartState$$.value.cartItems,
        { showingPartial: order, url: "", orderId: "" },
      ],
    });
  }

  fetchReservedOrders() {
    this.http
      .get<CartDTO[]>(API.ORDERS)
      .pipe(take(1))
      .subscribe({
        next: cartItems => this.patchState(cartItems),
        // next: cartItems => this.cartState$$.next({ cartItems: cartItems, text: "" }),
        error: error => error,
      });
  }

  private patchState(stateSlice: CartDTO[]) {
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
