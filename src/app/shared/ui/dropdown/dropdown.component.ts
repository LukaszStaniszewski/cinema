import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
} from "@angular/core";
import {
  Ticket,
  TicketDetails,
} from "@domains/booking/reservation/shared/ticket.state.service";

import { ClickOutsideModule } from "../../directives/clickOutside.directive";

export type Option = {
  value: { ticketsAmount: number; type: string };
  repeatAmount: number;
};
@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent implements OnChanges {
  hide = true;
  currentSelectedValue = "normlany";
  @Input() options!: TicketDetails[];
  @Input() ticket!: Ticket;

  @Output() selectedOptionEvent = new EventEmitter<{
    ticketTech: TicketDetails;
    ticket: { column: string; row: string };
  }>();

  toggleDropdown() {
    this.hide = !this.hide;
  }
  ngOnChanges() {
    this.currentSelectedValue = this.ticket.type;
  }

  setSelectedTicket(ticketTech: TicketDetails) {
    this.selectedOptionEvent.emit({
      ticketTech: ticketTech,
      ticket: this.ticket.seat.position,
    });
  }

  hideDropdown() {
    this.hide = true;
  }
}

@NgModule({
  declarations: [DropdownComponent],
  imports: [ClickOutsideModule, CommonModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
