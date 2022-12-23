import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import {
  Ticket,
  TicketService,
  TicketTypes,
} from '../ticket-details/ticket.service';
import { User } from '../../user/authentication.service';
import { CinemaRoomService, Seat } from '../cinema-room/cinema-room.service';

type TicketDetails = {
  type: TicketTypes;
  price: number;
  pickedTickets: number;
  seat: Seat;
};

type Summary = {
  details: TicketDetails[];
  date: string;
  movieTitle: string;
  owner: User['id'];
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

  mapTicketsAndSeats() {
    return combineLatest([
      this.ticketService.tickets$,
      this.cinemaRoomService.seatsBooked$,
    ]).pipe(
      map(([tickets, seats]) => ({ tickets: tickets, seats: seats })),
      tap(console.log)
    );
  }
}
