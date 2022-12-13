import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { SET_UP } from 'src/environments/constants';
import { TicketInfo, TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-ticket-details2',
  templateUrl: './ticket-details2.component.html',
  styleUrls: ['./ticket-details2.component.css'],
})
export class TicketDetails2Component {
  maxTicketAmount = SET_UP.MAX_TICKETS_AMOUT_PER_USER;
  options = [1, 2, 3, 4, 5, 6, 7, 9, 10];

  ticketsInfo!: TicketInfo[];
  hide = true;
  ticketType!: string;
  price!: number;
  selectedBilets = new Set([]);
  constructor(
    private builder: NonNullableFormBuilder,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketService.getTicketInfo();
    this.ticketService.ticketInfo$.subscribe((ticketInfo) => {
      this.ticketsInfo = ticketInfo;

      if (!ticketInfo[0]) return;

      this.mapDefaultValues(ticketInfo);
    });
  }

  private mapDefaultValues(ticket: TicketInfo[]) {
    const { price, type } = ticket[0];
    this.price = price;
    this.ticketType = type;
  }

  selectOnChange(event: { value: number; type: string }) {
    console.log('hit', event);
  }

  toggleDropdown() {
    this.hide = !this.hide;
  }
}
