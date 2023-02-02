import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { selectTickets } from "@domains/booking/store/booking.selectors";
import { AppStateWithBookingState } from "@domains/booking/store/booking.state";
import { Store } from "@ngrx/store";

import { Ticket, TicketDetails, TicketStateService } from "../shared/ticket.state.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor(private ticketService: TicketStateService) {}

  get ticketState$() {
    return this.ticketService.ticketState$;
  }
  tickets$ = this.store.select(selectTickets);
  ngOnInit() {
    this.ticketService.getTicketInfo();
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
