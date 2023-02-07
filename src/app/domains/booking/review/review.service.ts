import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShowingApiService, ShowingPartial } from "@domains/dashboard";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject, combineLatest } from "rxjs";

import { selectTicketsSortedByType, TicketsSortedByType } from "../store";

type Order = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: number;
};

export type ReviewState = {
  ticketsSortedByType: TicketsSortedByType[];
  showing: Maybe<ShowingPartial>;
};

@Injectable()
export class ReviewStateService {
  private reviewState$$ = new BehaviorSubject<ReviewState>({
    ticketsSortedByType: [],
    showing: null,
  });

  constructor(
    private http: HttpClient,
    private store: Store,
    private showingState: ShowingApiService
  ) {}

  getViewData(params: string) {
    combineLatest([
      this.store.select(selectTicketsSortedByType),
      this.showingState.getShowingPartial(params),
    ]).subscribe(([ticketsSortedByType, showing]) => {
      this.reviewState$$.next({ ticketsSortedByType, showing: showing });
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
