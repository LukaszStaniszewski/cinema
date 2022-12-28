import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ticket, TicketStateService } from './ticket.state.service';
import { Maybe } from '../../user/authentication.service';
import { Seat } from '../cinema-room/cinema-room.state.service';

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

  constructor(private ticketService: TicketStateService) {}

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
