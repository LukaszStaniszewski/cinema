import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppStateWithBookingState, BookingTicketActions } from "@domains/booking/store";
import { Store } from "@ngrx/store";

import { TicketStateService, ValuesRequiredToUpdateTicket } from "..";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private ticket = inject(TicketStateService);
  private store = inject<Store<AppStateWithBookingState>>(Store);

  get ticketInformation$() {
    return this.ticket.ticketInformation$;
  }

  updateTicket({ id, ticketDetails }: ValuesRequiredToUpdateTicket) {
    this.store.dispatch(BookingTicketActions.updateTicket({ id, valueToUpdate: ticketDetails }));
  }
}
