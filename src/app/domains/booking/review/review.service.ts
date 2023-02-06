import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";

import { AppState } from "../reservation/reservation.module";
import { selectBookingState } from "../store";

type Order1 = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: number;
};

type Order = {
  tickets: TicketsSortedByType[];
};

type TicketsSortedByType = {
  amount: number;
  kind: string;
  total: number;
};

@Injectable()
export class ReviewStateService {
  private reviewState$$ = new BehaviorSubject<TicketsSortedByType[]>([]);
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);
  constructor() {
    // const sortedTickets = {amount: 0, kind: "", total:0}
    const sorted: TicketsSortedByType[] = [
      { amount: 0, kind: "normalny", total: 0 },
      { amount: 0, kind: "ulgowy", total: 0 },
      { amount: 0, kind: "rodzinny", total: 0 },
    ];
    // this.reviewState$$.next(["", ""])
    this.store.select(selectBookingState).subscribe(state => {
      console.log("ticketstats", state.ticketStats);
      // console.log("state", tickets);
      // // state.tickets.map(ticket => ({ amount: ticket.kind }));
      // const ticketsCopy = tickets;
      // for (const ticket of ticketsCopy) {
      //   // sorted.push({kind})

      //   const sortedLength = sorted.length;
      //   sorted.forEach((value, index, array) => {
      //     if (ticket.kind === value.kind) {
      //       // console.log("sorted 1");
      //       array[index].amount = value.amount += 1;
      //       array[index].total = ticket.price + value.total;
      //       // console.log("sorted 2", sorted);
      //     }
      //   });
      //   // const currentTicketType = ticket.kind;

      //   // sorted.push({kind: ticket.kind, })
      // }
      // console.log("sorted 3", sorted);
    });
  }

  submitOrder(payload: Order1) {
    this.http.post(API.ORDER, payload).subscribe(console.log);
  }

  ngOnDestroy() {
    console.log("Review service destroyed");
  }
}
