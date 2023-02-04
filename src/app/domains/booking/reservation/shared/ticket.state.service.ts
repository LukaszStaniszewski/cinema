import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import BookingModule from "@domains/booking/booking.module";
import { BookingActions } from "@domains/booking/reservation/store/booking.actions";
import { selectTickets } from "@domains/booking/reservation/store/booking.selectors";
import { AppStateWithBookingState } from "@domains/booking/reservation/store/booking.state";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { BehaviorSubject, combineLatest, exhaustMap, map } from "rxjs";

import { CinemaRoomStateService, Seat, SeatBooked } from "..";

export type ValuesRequiredToUpdateTicket = {
  ticketDetails: TicketDetails;
  id: string;
};

export type TicketDetails = {
  kind: TicketTypes;
  price: number;
};
export type TicketTypes = "normalny" | "concessionary" | "family" | "voucher";

export type Ticket = {
  seat: SeatBooked;
  kind: TicketTypes;
  price: number;
};

type TicketState = {
  ticketDetails: TicketDetails[];
  tickets: Ticket1[];
};

export type Ticket1 = {
  id: string;
  seat: Seat;
  kind: TicketTypes;
  price: number;
};
@Injectable({
  providedIn: BookingModule,
})
export class TicketStateService {
  private ticketInformation$$ = new BehaviorSubject<TicketState>({
    ticketDetails: [],
    tickets: [],
  });

  private store = inject<Store<AppStateWithBookingState>>(Store);
  private toastService = inject(ToastStateService);

  constructor(private http: HttpClient) {
    combineLatest([this.store.select(selectTickets), this.fetchTicketDetails()]).subscribe(
      ([tickets, ticketDetails]) => {
        this.patchState({ tickets, ticketDetails });
      }
    );
  }

  get ticketInformation$() {
    return this.ticketInformation$$.asObservable();
  }

  update({ ticketDetails, id }: ValuesRequiredToUpdateTicket) {
    this.store.dispatch(BookingActions.updateTicket({ id, valueToUpdate: ticketDetails }));
  }

  addToList(seatToUpdate: Seat) {
    const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;

    if (seatToUpdate.reservation === true) {
      this.store.dispatch(BookingActions.removeTicket({ id: seatToUpdateId }));
    } else {
      this.store.dispatch(
        BookingActions.addTicketStart({ seat: seatToUpdate, id: seatToUpdateId })
      );
    }
  }

  mapSeatAndTicketType({ seat, id }: { seat: Seat; id: string }): Ticket1 {
    return {
      seat: {
        ...seat,
        reservation: true,
      },
      id,
      kind: this.ticketInformation$$.value.ticketDetails[0].kind,
      price: this.ticketInformation$$.value.ticketDetails[0].price,
    };
  }

  fetchTicketDetails() {
    return this.http.get<TicketDetails[]>(API.TICKET_INFO);
  }

  private patchState(stateSlice: Partial<TicketState>) {
    this.ticketInformation$$.next({
      ...this.ticketInformation$$.value,
      ...stateSlice,
    });
  }
}
