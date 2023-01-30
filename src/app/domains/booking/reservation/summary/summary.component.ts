import { ChangeDetectionStrategy, Component } from "@angular/core";

import {
  Ticket,
  TicketDetails,
  TicketStateService,
} from "../shared/ticket.state.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  constructor(private ticketService: TicketStateService) {}

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
