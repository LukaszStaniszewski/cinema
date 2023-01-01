import { Component, OnInit } from "@angular/core";

import {
  Ticket,
  TicketDetails,
  TicketStateService,
} from "../shared/ticket.state.service";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"],
})
export class TicketComponent {
  constructor(private ticketService: TicketStateService) {}

  get ticketState$() {
    return this.ticketService.ticketState$;
  }

  addTicket(details: TicketDetails, ticket: { column: string; row: string }) {
    this.ticketService.mapTickets(details, ticket);
  }
}
