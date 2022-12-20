import { Component, OnInit } from '@angular/core';
import { CinemaRoomService } from '../cinema-room/cinema-room.service';
import { TicketService } from '../ticket-details/ticket.service';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
//@ts-ignore
export class SummaryComponent implements OnInit {
  constructor(
    private ticketService: TicketService,
    private cinemaRoomService: CinemaRoomService,
    private summaryService: SummaryService
  ) {}

  get ticketsInfo() {
    return this.ticketService.tickets$;
  }

  vm = this.summaryService.mapTicketsAndSeats();
  ngOnInit(): void {}
}
