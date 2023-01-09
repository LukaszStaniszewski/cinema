/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";

import {
  Ticket,
  TicketDetails,
  TicketStateService,
} from "../shared/ticket.state.service";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketComponent {
  constructor(private ticketService: TicketStateService) {}
  log() {
    console.log("ticket component");
  }

  get ticketState$() {
    return this.ticketService.ticketState$;
  }

  addTicket({
    ticketTech,
    ticket,
  }: {
    ticketTech: TicketDetails;
    ticket: { column: string; row: string };
  }) {
    this.ticketService.mapTickets(ticketTech, ticket);
  }

  trackById(index: number, ticket: Ticket) {
    return ticket.seat.id;
  }
}
