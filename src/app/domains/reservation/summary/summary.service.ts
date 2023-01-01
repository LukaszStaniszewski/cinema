import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';

import {
  Ticket,
  TicketStateService,
  TicketTypes,
  CinemaRoomStateService,
  Seat,
  SeatBooked,
} from '..';
import { User } from '../../user/authentication.service';

type TicketDetails = {
  type: TicketTypes;
  price: number;
  pickedTickets: number;
  seat: Partial<Seat>;
};

type Summary2 = {
  ticketsDetails: TicketDetails[];
  totalPrice: number;
  date: string;
  movieTitle: string;
  owner: User['id'];
};

interface TicketTrue {
  seat: Seat;
  type: string;
  price: number;
}

type BookingState = {
  tickets: TicketTrue[];
  showingsId: string;
  totalPrice: number;
};

type Summary = {
  tickets: Ticket[];
  total: number;
  seats: SeatBooked[];
};

type TicketState = {
  tickets: Ticket[];
  showingId: string;
  totalPrice: number;
};

@Injectable({
  // providedIn: ReservationModule,
  providedIn: 'root',
})
export class SummaryService {
  // private summaryState$$ = new BehaviorSubject<SummaryState>({
  //   ticketsDetails: [],
  //   totalPrice: 0,
  //   date: '',
  //   movieTitle: '',
  //   owner: NaN,
  // });

  constructor(
    private cinemaRoomService: CinemaRoomStateService,
    private ticketService: TicketStateService
  ) {}

  ngOnInit(): void {}
  mapTicketsAndSeats(): Observable<Summary> {
    return combineLatest([
      this.ticketService.tickets$,
      this.cinemaRoomService.selectSeatsBooked$,
    ]).pipe(
      map(([ticketState, seats]) => ({
        tickets: ticketState.tickets,
        total: ticketState.totalPrice,
        seats: seats,
      })),
      filter(
        (val) =>
          val.tickets.reduce((acc, val) => val.pickedTickets + acc, 0) >=
          val.seats.length
      ),
      tap(console.log)
    );
  }
}
