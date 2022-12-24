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
  TicketService,
  TicketTypes,
} from '../ticket-details/ticket.service';
import {
  CinemaRoomService,
  Seat,
  SeatBooked,
} from '../cinema-room/cinema-room.service';

type TicketDetails = {
  type: TicketTypes;
  price: number;
  pickedTickets: number;
  seat: Seat;
};

// type Summary = {
//   details: TicketDetails[];
//   totalPrice: number;
//   date: string;
//   movieTitle: string;
//   owner: User['id'];
// };

type Summary = {
  tickets: Ticket[];
  total: number;
  seats: SeatBooked[];
};

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private summaryState$$ = new BehaviorSubject<Summary | null>(null);

  constructor(
    private cinemaRoomService: CinemaRoomService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {}
  mapTicketsAndSeats(): Observable<Summary> {
    return combineLatest([
      this.ticketService.tickets$,
      this.cinemaRoomService.seatsBooked$,
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
