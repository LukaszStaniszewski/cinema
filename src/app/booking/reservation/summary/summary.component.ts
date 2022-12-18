import { Component, OnInit } from '@angular/core';
import { CinemaRoomService } from '../cinema-room/cinema-room.service';
import { TicketService } from '../ticket-details/ticket.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(
    private ticketService: TicketService,
    private cinemaRoomService: CinemaRoomService
  ) {}

  get ticketsInfo() {
    return this.ticketService.tickets$;
  }
  ngOnInit(): void {}
}
