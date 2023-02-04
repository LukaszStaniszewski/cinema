import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, NgModule, OnChanges, Output } from "@angular/core";

import { ClickOutsideModule } from "../../directives/clickOutside.directive";
export type TicketDetails = {
  kind: TicketTypes;
  price: number;
};
export type TicketTypes = "normalny" | "concessionary" | "family" | "voucher";
export type Ticket = {
  id: string;
  seat: Seat;
  kind: TicketTypes;
  price: number;
};
export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};
@Component({
  selector: "app-dropdown[options]",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent implements OnChanges {
  hide = true;
  currentSelectedValue = "normlany";
  @Input() options!: TicketDetails[];
  @Input() ticket!: Ticket;

  @Output() selectedOptionEvent = new EventEmitter<{
    ticketDetails: TicketDetails;
    id: string;
  }>();

  toggleDropdown() {
    this.hide = !this.hide;
  }
  ngOnChanges() {
    this.currentSelectedValue = this.ticket.kind;
  }

  setSelectedTicket(ticketDetails: TicketDetails) {
    const { row, column } = this.ticket.seat.position;
    const id = row + column;
    this.selectedOptionEvent.emit({
      ticketDetails,
      id,
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
