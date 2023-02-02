import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BookingActions } from "@domains/booking/store/booking.actions";
import { selectTickets } from "@domains/booking/store/booking.selectors";
import { AppStateWithBookingState } from "@domains/booking/store/booking.state";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { BehaviorSubject, combineLatest, map } from "rxjs";

import { CinemaRoomStateService, Seat, SeatBooked } from "..";
import ReservationModule from "../reservation.module";

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
  ticketsTech: TicketDetails[];
  tickets: Ticket[];
  showingId: string | null;
  totalPrice: number;
};

export type Ticket1 = {
  id: string;
  seat: Seat;
  kind: TicketTypes;
  price: number;
};
@Injectable()
export class TicketStateService {
  private ticketState$$ = new BehaviorSubject<TicketState>({
    ticketsTech: [],
    tickets: [],
    showingId: null,
    totalPrice: 0,
  });

  private store = inject<Store<AppStateWithBookingState>>(Store);
  private toastService = inject(ToastStateService);

  constructor(
    private http: HttpClient // private cinemaRoomService: CinemaRoomStateService
  ) {
    console.log(this.store.subscribe(state => console.log(state.booking.tickets)));
    // combineLatest([
    //   this.http.get<PTicketDetails[]>(API.TICKET_INFO),
    //   this.cinemaRoomService.selectSeatsBooked$,
    // ]).subscribe(([ticketInfo, seatsBooked]) => {
    //   const defaultValue = seatsBooked.map(seat => ({
    //     seat: seat,
    //     type: ticketInfo[0].type,
    //     price: ticketInfo[0].price,
    //   }));
    //   this.patchState({
    //     ticketsTech: ticketInfo,
    //     tickets:
    //       seatsBooked.length === 0
    //         ? defaultValue
    //         : this.mapTicketsAndSeats(ticketInfo, seatsBooked),
    //     showingId: seatsBooked.length ? "test" : null,
    //   });
    // });
  }
  removeTicket() {
    this.store.select(selectTickets).pipe();
  }

  updateList(seatToUpdate: Seat) {
    const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;

    if (seatToUpdate.reservation === true) {
      this.store.dispatch(BookingActions.remove_ticket({ id: seatToUpdateId }));
    } else if (seatToUpdate) {
      this.store.dispatch(BookingActions.add_seat({ seat: seatToUpdate, id: seatToUpdateId }));
    } else {
      this.toastService.updateToast({ message: MESSAGE.TICKET_LIMIT, status: "info" });
    }
  }

  mapSeatAndTicketType({ seat, id }: { seat: Seat; id: string }): Ticket1 {
    return {
      seat: {
        ...seat,
        reservation: true,
      },
      id,
      kind: this.ticketState$$.value.ticketsTech[0].kind,
      price: this.ticketState$$.value.ticketsTech[0].price,
    };
  }

  private mapTicketsAndSeats(ticketInfo: TicketDetails[], seatsBooked: SeatBooked[]) {
    const ticketStateSeatsId = this.ticketState$$.value.tickets.map(ticket => ticket.seat.id);
    const seatsBookedId = seatsBooked.map(seat => seat.id);
    let tickets = this.ticketState$$.value.tickets;
    for (let i = 0; i < seatsBooked.length; i++) {
      if (!ticketStateSeatsId.includes(seatsBooked[i].id)) {
        tickets.push({
          seat: seatsBooked[i],
          kind: ticketInfo[0].kind,
          price: ticketInfo[0].price,
        });
      }
    }
    for (let j = 0; j < tickets.length; j++) {
      if (!seatsBookedId.includes(tickets[j].seat.id)) {
        tickets = tickets.filter(ticket => ticket.seat.id !== tickets[j].seat.id);
      }
    }
    return tickets;
  }

  get ticketState$() {
    return this.ticketState$$.asObservable();
  }

  get tickets() {
    return this.ticketState$$.value.tickets;
  }
  get selectTickets$() {
    return this.ticketState$.pipe(map(state => state.tickets));
  }
  get selectTicketDetails$() {
    return this.ticketState$.pipe(map(state => state.ticketsTech));
  }

  getTicketInfo() {
    this.http.get<TicketDetails[]>(API.TICKET_INFO).subscribe(ticketInfo => {
      this.patchState({ ticketsTech: ticketInfo });
    });
  }

  mapTickets({ kind, price }: TicketDetails, { column, row }: { column: string; row: string }) {
    const id = row + column;
    const updatedTickets = this.ticketState$$.value.tickets.map(ticket => {
      if (id == ticket?.seat.id) return { ...ticket, kind, price };
      return ticket;
    });
    this.patchState({
      tickets: updatedTickets,
    });
  }

  private patchState(stateSlice: Partial<TicketState>) {
    this.ticketState$$.next({
      ...this.ticketState$$.value,
      ...stateSlice,
    });
  }
}
