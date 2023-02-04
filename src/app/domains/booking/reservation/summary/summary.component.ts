import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { TicketStateService, ValuesRequiredToUpdateTicket } from "../shared/ticket.state.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private ticketService = inject(TicketStateService);

  get ticketInformation$() {
    return this.ticketService.ticketInformation$;
  }

  updateTicket(ticketData: ValuesRequiredToUpdateTicket) {
    this.ticketService.update(ticketData);
  }
}
