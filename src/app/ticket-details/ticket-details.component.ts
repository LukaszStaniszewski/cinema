import { Component, Input, OnInit } from '@angular/core';
import { Seat } from '../movie/movie.service';
import { TicketInfo, TicketService } from '../ticket/ticket.service';
import { Maybe } from '../user/authentication.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  ticketsInfo!: TicketInfo[];
  hide = true;
  ticketType!: string;
  price!: number;
  @Input() seats: Maybe<Seat[]>;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTicketInfo();
    this.ticketService.ticketInfo$.subscribe((ticketInfo) => {
      this.ticketsInfo = ticketInfo;
      if (!ticketInfo[0]) return;
      this.mapDefaultValues(ticketInfo);
    });
  }

  private mapDefaultValues(ticket: TicketInfo[]) {
    const { price, type } = ticket[0];
    this.price = price;
    this.ticketType = type;
  }

  getSelectedTicketValues(biletInfo: TicketInfo) {
    if (biletInfo.type === this.ticketType) return;
    this.price = biletInfo.price;
    this.ticketType = biletInfo.type;
  }
}
