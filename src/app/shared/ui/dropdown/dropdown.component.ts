import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Ticket } from "src/app/domains/reservation/ticket-details/ticket.state.service";

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
  currentSelectedValue = 0;
  @Input() options: number[] = [];
  @Input() ticket!: Ticket;

  @Output() selectedOptionEvent = new EventEmitter<{
    type: string;
    selectedTicketsAmount: number;
  }>();

  constructor() {}

  toggleDropdown() {
    this.hide = !this.hide;
  }
  ngOnChanges() {
    this.currentSelectedValue = this.ticket.pickedTickets;
  }

  setSelectedTicket(ticketsAmount: number) {
    this.currentSelectedValue = ticketsAmount;

    this.selectedOptionEvent.emit({
      type: this.ticket.type,
      selectedTicketsAmount: ticketsAmount,
    });
  }

  hideDropdown() {
    this.hide = true;
  }
}

@NgModule({
  declarations: [DropdownComponent],
  imports: [ClickOutsideModule, BrowserModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
