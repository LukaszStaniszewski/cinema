import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ticket, TicketService } from './ticket.service';
import { Maybe } from '../../user/authentication.service';
import { Seat } from '../cinema-room/cinema-room.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  options!: { [Property in Ticket['type']]: number[] };
  totalPrice = 0;

  @Input() seats: Maybe<Seat[]>;
  @Output() toggleEmitter = new EventEmitter(true);

  constructor(private ticketService: TicketService) {}

  get tickets$() {
    return this.ticketService.tickets$;
  }
  ngOnInit(): void {
    this.ticketService.getTicketInfo();
    this.ticketService.tickets$.subscribe(({ tickets }) => {
      this.adjustOptions(tickets);
    });
  }

  private adjustOptions(tickets: Ticket[]) {
    tickets.forEach((ticket) => {
      this.options = {
        ...this.options,
        [ticket.type]: new Array(ticket.ticketsLeft + 1).fill(0),
      };
    });
  }

  // private calculateTotalPrice(tickets: Ticket[]) {
  //   let holder = 0;
  //   for (let ticket of tickets) {
  //     holder += ticket.price * ticket.pickedTickets;
  //   }
  //   this.totalPrice = holder;
  // }

  getSelectedOption({
    type,
    selectedTicketsAmount,
  }: {
    type: string;
    selectedTicketsAmount: number;
  }) {
    this.ticketService.adjustTotalTicketsAvaible(type, selectedTicketsAmount);
  }

  submit() {
    const total = this.ticketService.calculateChoosenTicketsAmount();
    if (!total) return this.toggleEmitter.emit(true);
    if (total > 10) return;
    this.toggleEmitter.emit(true);
  }
}
