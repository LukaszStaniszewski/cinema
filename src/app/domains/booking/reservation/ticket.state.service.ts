import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  AppStateWithBookingState,
  BookingTicketActions,
  selectTickets,
  selectTotalPrice,
  Ticket,
  TicketDetails,
} from "@domains/booking/store";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, takeUntil } from "rxjs";

import { Seat } from "./cinema-room/cinema-room.state.service";

export type ValuesRequiredToUpdateTicket = {
  ticketDetails: TicketDetails;
  id: string;
};

type TicketInformation = {
  ticketDetails: TicketDetails[];
  tickets: Ticket[];
  totalPrice: number;
};

const defaultTicketInformation = {
  ticketDetails: [],
  tickets: [],
  totalPrice: 0,
};

@Injectable()
export class TicketStateService {
  private ticketInformation$$ = new BehaviorSubject<TicketInformation>(defaultTicketInformation);

  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor(private http: HttpClient) {
    combineLatest([
      this.store.select(selectTickets),
      this.store.select(selectTotalPrice),
      this.fetchTicketDetails(),
    ]).subscribe(([tickets, totalPrice, ticketDetails]) => {
      this.patchState({ tickets, totalPrice, ticketDetails });
    });
  }

  private calculateTotalPrice(tickets: Ticket[]) {
    return tickets.map(ticket => ticket.price).reduce((acc, current) => current + acc, 0);
  }
  get ticketInformation$() {
    return this.ticketInformation$$.asObservable();
  }

  addToList(seatToUpdate: Seat) {
    const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;
    if (seatToUpdate.reservation === true) {
      this.store.dispatch(BookingTicketActions.removeTicket({ id: seatToUpdateId }));
    } else {
      this.store.dispatch(
        BookingTicketActions.addTicketStart({ seat: seatToUpdate, id: seatToUpdateId })
      );
    }
  }

  mapSeatAndTicketType({ seat, id }: { seat: Seat; id: string }): Ticket {
    return {
      seat: {
        ...seat,
        reservation: true,
      },
      id,
      type: this.ticketInformation$$.value.ticketDetails[0].type,
      price: this.ticketInformation$$.value.ticketDetails[0].price,
    };
  }

  fetchTicketDetails() {
    return this.http
      .get<TicketDetails[]>(API.TICKET_INFO)
      .pipe(takeUntil(this.ticketInformation$$.value.ticketDetails));
  }
  reset() {
    this.patchState({ tickets: [] });
  }

  private patchState(stateSlice: Partial<TicketInformation>) {
    this.ticketInformation$$.next({
      ...this.ticketInformation$$.value,
      ...stateSlice,
    });
  }

  ngOnDestroy() {
    console.log("ticket service destroyed");
  }
}
