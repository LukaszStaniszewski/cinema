import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketInfo, TicketService } from 'src/app/ticket/ticket.service';

export type Option = {
  value: { ticketsAmount: number; type: string };
  repeatAmount: number;
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  hide = true;

  currentSelectedValue = 0;
  options: number[] = new Array(11).fill(0);
  @Input() ticket!: TicketInfo;

  @Output() selectedOptionEvent = new EventEmitter<{
    type: string;
    selectedAmount: number;
  }>();

  constructor() {}

  toggleDropdown() {
    this.hide = !this.hide;
  }
  ngDoCheck() {
    this.options = new Array(11 - this.ticket.pickedTickets).fill(0);
  }

  setSelectedTicket(ticketsAmount: number) {
    this.currentSelectedValue = ticketsAmount;

    console.log('dropdown', this.ticket);

    this.selectedOptionEvent.emit({
      type: this.ticket.type,
      selectedAmount: ticketsAmount,
    });
  }

  hideDropdown() {
    this.hide = true;
  }
}
