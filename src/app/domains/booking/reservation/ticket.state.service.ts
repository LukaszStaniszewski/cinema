import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService, AuthType } from "@domains/auth";
import {
  AppStateWithBookingState,
  BookingTicketActions,
  selectTickets,
  selectTicketsWithTotalPrice,
  Ticket,
  TicketDetails,
} from "@domains/booking/store";
import { API } from "@environments/constants";
import { Store } from "@ngrx/store";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  of,
  skip,
  takeUntil,
} from "rxjs";

import { Seat } from ".";

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
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {
    combineLatest([
      this.store.select(selectTicketsWithTotalPrice),
      this.fetchTicketDetails(),
    ]).subscribe(([{ tickets, totalPrice }, ticketDetails]) => {
      this.patchState({ tickets, totalPrice, ticketDetails });
    });
  }

  private patchState(stateSlice: Partial<TicketInformation>) {
    this.ticketInformation$$.next({
      ...this.ticketInformation$$.value,
      ...stateSlice,
    });
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

  detectChangesToUpdateDB(reservationId: string) {
    if (this.isAuthenticated("customer")) {
      this.saveToDB(reservationId);
    } else {
      this.saveLocaly();
    }
  }

  private isAuthenticated(type: AuthType): boolean {
    return this.authService.authState.authType === type;
  }

  private saveToDB(reservationId: string) {
    this.store
      .select(selectTickets)
      .pipe(
        skip(1),
        debounceTime(700),
        distinctUntilChanged(),
        concatMap(tickets => this.http.patch(`${API.RESERVATIONS}/${reservationId}`, tickets)),
        catchError(error => of(error))
      )
      .subscribe();
  }

  private saveLocaly() {
    of(console.log("hey")).subscribe();
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

  ngOnDestroy() {
    console.log("ticket service destroyed");
  }
}
