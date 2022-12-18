import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  Ticket,
  TicketService,
  TicketTypes,
} from '../ticket-details/ticket.service';
import { User } from 'src/app/user/authentication.service';
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
    combineLatest([
      this.ticketService.tickets$,
      this.cinemaRoomService.cinemaRoom$,
    ]).pipe();
  }
}
