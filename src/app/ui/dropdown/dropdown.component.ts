import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { TicketInfo } from 'src/app/ticket/ticket.service';
import { Maybe } from 'src/app/user/authentication.service';
type Cos = {
  [key: string]: number;
};
export type Option = {
  value: { ticketsAmount: number; type: string };
  repeatAmount: number;
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent<T> {
  hide = true;
  selectedTickets: null | Cos = null;
  currentSelectedValue = 0;
  @Input() ticketInfo!: TicketInfo;
  @Input() options!: any[];
  @Input() option!: Option | null;
  @Output() selectedOptionEvent = new EventEmitter<Option>();

  constructor() {}

  ngOnInit(): void {}

  toggleDropdown() {
    this.hide = !this.hide;
  }
  setSelectedTicket({
    ticketsAmount,
    type,
  }: {
    ticketsAmount: number;
    type: string;
  }) {
    this.currentSelectedValue = ticketsAmount;
    this.selectedOptionEvent.emit({
      value: { ticketsAmount, type },
      repeatAmount: this.options.length - 1,
    });
  }

  hideDropdown() {
    this.hide = true;
  }
}
