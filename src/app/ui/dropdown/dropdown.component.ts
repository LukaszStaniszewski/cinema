import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicketInfo } from 'src/app/ticket/ticket.service';
import { Maybe } from 'src/app/user/authentication.service';
type Cos = {
  [key: string]: number;
};
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  hide = true;
  selectedTickets: null | Cos = null;
  currentValue = 0;
  @Input() ticketInfo!: TicketInfo;
  @Input() options!: any[];
  @Output() selectedOptionEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  toggleDropdown() {
    this.hide = !this.hide;
  }
  setSelectedTicket({ amount, type }: { amount: number; type: string }) {
    this.currentValue = amount;
    this.selectedOptionEvent.emit({ amount, type });
  }

  hideDropdown() {
    this.hide = true;
  }
}
