import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShowingApiService, ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject, combineLatest } from "rxjs";

import { selectTickets, selectTicketsSortedByType, TicketTypes } from "../store";

type Order = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: number;
};

export type ReviewState = {
  sortedTickets: TicketsSortedByType;
  showing: Maybe<ShowingPartial>;
};
type TicketsSortedByType = {
  [key: string]: { amout: number; price: number };
};
@Injectable()
export class ReviewStateService {
  private reviewState$$ = new BehaviorSubject<ReviewState>({
    sortedTickets: {},
    showing: null,
  });
  // private holder$$ = new BehaviorSubject<TicketsSortedByType>({});

  constructor(
    private http: HttpClient,
    private store: Store,
    private showingState: ShowingApiService
  ) {
    this.reviewState$$.subscribe(value => console.log("holder", value));
  }

  getViewData(params: string) {
    let holder: TicketsSortedByType = {};
    combineLatest([
      this.store.select(selectTickets),
      this.showingState.getShowingPartial(params),
    ]).subscribe(([tickets, showing]) => {
      holder = {};

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
      // this.holder$$.next(holder);
      this.reviewState$$.next({
        ...this.reviewState$$.value,
        sortedTickets: holder,
        showing: showing,
      });
    });
  }

  get reviewState$() {
    return this.reviewState$$.asObservable();
  }

  submitOrder(payload: Order) {
    this.http.post(API.ORDER, payload).subscribe(console.log);
  }

  ngOnDestroy() {
    console.log("Review service destroyed");
  }
}
