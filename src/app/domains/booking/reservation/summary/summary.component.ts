import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { TicketStateService, ValuesRequiredToUpdateTicket } from "..";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private ticket = inject(TicketStateService);

  get ticketInformation$() {
    return this.ticket.ticketInformation$;
  }

  updateTicket(ticketData: ValuesRequiredToUpdateTicket) {
    this.ticket.update(ticketData);
  }
}
