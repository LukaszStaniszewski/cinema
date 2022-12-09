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
  @Input() seats: Maybe<Seat[]>;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTicketInfo();
    this.ticketService.ticketInfo$.subscribe((ticketInfo) => {
      // this.biletTypes = ticketInfo.map(info => info.type)
      this.ticketsInfo = ticketInfo;
    });
  }

  selected(biletInfo: any) {
    console.log(biletInfo);
  }
  // mapTicketData(ticketInfo: TicketInfo[]) {
  //   const type = ticketInfo.map(info => info.type)
  //   const currentPrice = ticketInfo.filter(info => info.price === )
  // }
}
