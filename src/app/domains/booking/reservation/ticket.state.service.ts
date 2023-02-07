import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  AppStateWithBookingState,
  BookingTicketActions,
  BookingTicketSortedActions,
  selectTickets,
  Ticket,
  TicketDetails,
  TicketTypes,
} from "@domains/booking/store";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, map, takeUntil } from "rxjs";

import { Seat } from "./cinema-room/cinema-room.state.service";

export type ValuesRequiredToUpdateTicket = {
  ticketDetails: TicketDetails;
  currentType: TicketTypes;
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
    combineLatest([this.store.select(selectTickets), this.fetchTicketDetails()])
      .pipe(
        map(([tickets, ticketDetails]) => ({
          tickets,
          ticketDetails,
          totalPrice: this.calculateTotalPrice(tickets),
        }))
      )
      .subscribe(ticketInfo => {
        if (!ticketInfo.tickets.length) {
          this.initialValuesForTicketStats(ticketInfo.ticketDetails);
        }
        this.patchState({ ...ticketInfo });
        this.store.dispatch(
          BookingTicketActions.updateTotalPrice({ total: ticketInfo.totalPrice })
        );
      });
  }

  get ticketInformation$() {
    return this.ticketInformation$$.asObservable();
  }

  private calculateTotalPrice(tickets: Ticket[]) {
    return tickets.map(ticket => ticket.price).reduce((acc, current) => current + acc, 0);
  }

  update({ ticketDetails, id, currentType }: ValuesRequiredToUpdateTicket) {
    this.store.dispatch(BookingTicketActions.updateTicket({ id, valueToUpdate: ticketDetails }));
    this.store.dispatch(
      BookingTicketSortedActions.updateTicketsSortedByTypeStart({
        payload: { currentType, price: ticketDetails.price, type: ticketDetails.type },
      })
    );
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

  // sortBasicTicketDataByType() {

  // }
  private initialValuesForTicketStats(ticketDetails: TicketDetails[]) {
    const initialValues = ticketDetails.map(ticket => ({ type: ticket.type, amount: 0, price: 0 }));
    this.store.dispatch(
      BookingTicketSortedActions.addInitialValuesForTicketSortedByType({ initial: initialValues })
    );
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
