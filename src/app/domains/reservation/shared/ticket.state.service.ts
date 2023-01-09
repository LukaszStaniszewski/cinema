import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { API } from "src/environments/constants";

import { CinemaRoomStateService, SeatBooked } from "..";

export type TicketDetails = {
  type: TicketTypes;
  price: number;
};
export type TicketTypes = "normalny" | "concessionary" | "family" | "voucher";

export type Ticket = {
  seat: SeatBooked;
  type: TicketTypes;
  price: number;
};

type TicketState = {
  ticketsTech: TicketDetails[];
  tickets: Ticket[];
  showingId: string | null;
  totalPrice: number;
};

@Injectable({
  providedIn: "root",
})
export class TicketStateService {
  private ticketState$$ = new BehaviorSubject<TicketState>({
    ticketsTech: [],
    tickets: [],
    showingId: null,
    totalPrice: 0,
  });
  constructor(
    private http: HttpClient,
    private cinemaRoomService: CinemaRoomStateService
  ) {
    combineLatest([
      this.http.get<TicketDetails[]>(API.TICKET_INFO),
      this.cinemaRoomService.selectSeatsBooked$,
    ]).subscribe(([ticketInfo, seatsBooked]) => {
      const defaultValue = seatsBooked.map(seat => ({
        seat: seat,
        type: ticketInfo[0].type,
        price: ticketInfo[0].price,
      }));
      this.patchState({
        ticketsTech: ticketInfo,
        tickets:
          seatsBooked.length === 0
            ? defaultValue
            : this.mapTicketsAndSeats(ticketInfo, seatsBooked),
        showingId: seatsBooked.length ? "test" : null,
      });
    });
  }

  // ngOnInit() {

  // }

  private mapTicketsAndSeats(ticketInfo: TicketDetails[], seatsBooked: SeatBooked[]) {
    const ticketStateSeatsId = this.ticketState$$.value.tickets.map(
      ticket => ticket.seat.id
    );
    const seatsBookedId = seatsBooked.map(seat => seat.id);
    let tickets = this.ticketState$$.value.tickets;
    for (let i = 0; i < seatsBooked.length; i++) {
      if (!ticketStateSeatsId.includes(seatsBooked[i].id)) {
        tickets.push({
          seat: seatsBooked[i],
          type: ticketInfo[0].type,
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

  mapTickets(
    { type, price }: TicketDetails,
    { column, row }: { column: string; row: string }
  ) {
    const id = row + column;
    const updatedTickets = this.ticketState$$.value.tickets.map(ticket => {
      if (id == ticket?.seat.id) return { ...ticket, type, price };
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
