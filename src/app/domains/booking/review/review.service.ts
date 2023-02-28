import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@domains/auth";
import { ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject, combineLatest, delay, switchMap } from "rxjs";

import { selectTicketsWithTotalPriceAndShowingPartial, Ticket, TicketTypes } from "../store";

type Order = {
  userCredentials: User;
  tickets: Ticket[];
  showingPartial: ShowingPartial;
  totalPrice: number;
};

export type ReviewState = {
  sortedTickets: Maybe<TicketsSortedByType>;
  showing: Maybe<ShowingPartial>;
  totalPrice: number;
  totalAmount: number;
};
type TicketsSortedByType = {
  [K in TicketTypes]: { amout: number; price: number };
};
@Injectable()
export class ReviewStateService {
  private reviewState$$ = new BehaviorSubject<ReviewState>({
    sortedTickets: null,
    showing: null,
    totalPrice: 0,
    totalAmount: 0,
  });

  constructor(private http: HttpClient, private store: Store) {}

  getViewData() {
    combineLatest([this.store.select(selectTicketsWithTotalPriceAndShowingPartial)]).subscribe(
      ([{ tickets, totalPrice, showingPartial }]) => {
        const sortedTickets = this.sortTicketsByType(tickets);
        this.reviewState$$.next({
          ...this.reviewState$$.value,
          sortedTickets: sortedTickets,
          showing: showingPartial,
          totalPrice: totalPrice,
          totalAmount: tickets.length,
        });
      }
    );
  }

  getTotalPrice() {
    return this.reviewState$$.value.totalPrice;
  }

  private sortTicketsByType(tickets: Ticket[]): TicketsSortedByType {
    let holder = {} as TicketsSortedByType;

    for (let i = 0; i < tickets.length; i++) {
      holder = {
        ...holder,
        [tickets[i].type]: {
          amout: holder[tickets[i].type]?.amout ? holder[tickets[i].type]?.amout + 1 : 1,
          price: holder[tickets[i].type]?.price
            ? holder[tickets[i].type]?.price + tickets[i].price
            : tickets[i].price,
        },
      };
    }
    return holder;
  }

  get reviewState$() {
    return this.reviewState$$.asObservable();
  }

  submitOrder(payload: User, reservationId: string) {
    return this.store.select(selectTicketsWithTotalPriceAndShowingPartial).pipe(
      delay(300),
      switchMap(value =>
        combineLatest([
          this.http.post<{ id: string }>(`${API.ORDER_PAYED}/${reservationId}`, {
            ...value,
            userCredentials: payload,
          }),
        ])
      ),
      delay(300)
    );
  }
}

// submitOrder(payload: User, reservationId: string) {
//   return this.store.select(selectTicketsWithTotalPriceAndShowingPartial).pipe(
//     switchMap(value =>
//       combineLatest([
//         this.http.post<Order>(`${API.ORDER_PAYED}/${reservationId}`, {
//           ...value,
//           userCredentials: payload,
//         }),
//         of(this.cartService.delete(reservationId))
//       ])
//     )
//   );
// }
// }
