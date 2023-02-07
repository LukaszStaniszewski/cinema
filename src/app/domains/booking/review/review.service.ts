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
  type: string;
  total: number;
};

@Injectable()
export class ReviewStateService {
  private reviewState$$ = new BehaviorSubject<TicketsSortedByType[]>([]);
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);
  constructor() {
    // const sortedTickets = {amount: 0, type: "", total:0}
    const sorted: TicketsSortedByType[] = [
      { amount: 0, type: "normalny", total: 0 },
      { amount: 0, type: "ulgowy", total: 0 },
      { amount: 0, type: "rodzinny", total: 0 },
    ];
    // this.reviewState$$.next(["", ""])
    this.store.select(selectBookingState).subscribe(state => {
      console.log("ticketsSortedByType", state.ticketsSortedByType);
      // console.log("state", tickets);
      // // state.tickets.map(ticket => ({ amount: ticket.type }));
      // const ticketsCopy = tickets;
      // for (const ticket of ticketsCopy) {
      //   // sorted.push({type})

      //   const sortedLength = sorted.length;
      //   sorted.forEach((value, index, array) => {
      //     if (ticket.type === value.type) {
      //       // console.log("sorted 1");
      //       array[index].amount = value.amount += 1;
      //       array[index].total = ticket.price + value.total;
      //       // console.log("sorted 2", sorted);
      //     }
      //   });
      //   // const currentTicketType = ticket.type;

      //   // sorted.push({type: ticket.type, })
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
