import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { Ticket, TicketDetails } from "@domains/booking/store";

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
    this.currentSelectedValue = this.ticket.type;
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
