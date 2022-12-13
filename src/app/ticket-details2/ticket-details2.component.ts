import { Component, Input, OnInit } from '@angular/core';
import { Seat } from '../movie/movie.service';
import { Ticket, TicketInfo, TicketService } from '../ticket/ticket.service';
import { Maybe } from '../user/authentication.service';

type Cos = {
  [key: string]: number;
};
@Component({
  selector: 'app-ticket-details2',
  templateUrl: './ticket-details2.component.html',
  styleUrls: ['./ticket-details2.component.css'],
})
export class TicketDetails2Component implements OnInit {
  ticketsInfo!: TicketInfo[];
  hide = true;
  options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ticketType!: string;
  price!: number;
  totalPrice = 0;
  selectedTickets: null | Cos = null;
  // ticketSelected: ""
  @Input() seats: Maybe<Seat[]>;

  constructor(private ticketService: TicketService) {}

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

  getSelectedTicketValues(biletInfo: TicketInfo) {
    if (biletInfo.type === this.ticketType) return;
    // this.ticketsInfo.push(biletInfo);s
    this.price = biletInfo.price;
    this.ticketType = biletInfo.type;
  }

  toggleDropdown() {
    console.log('toggle');
    this.hide = !this.hide;
  }

  setSelectedTicket({ amount, type }: { amount: number; type: string }) {
    console.log('hit');

    this.selectedTickets = { ...this.selectedTickets, [type]: amount };
    // for (let ticketInfo of this.ticketsInfo) {
    //   if (ticketInfo.type === type) {
    //     holder += amount * ticketInfo.price;
    //   }
    // }
    // this.totalPrice = holder;
    // console.log(this.selectedTickets);
    // console.log(this.selectedTickets);
    // console.log({ amount, type });
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    if (!this.selectedTickets) return;
    const ticketTypes = Object.keys(this.selectedTickets);
    let holder = 0;
    for (let ticketType of ticketTypes) {
      for (let ticketInfo of this.ticketsInfo) {
        if (ticketInfo.type === ticketType) {
          holder += this.selectedTickets[ticketType] * ticketInfo.price;
        }
      }
      this.totalPrice = holder;

      // for (let test of tests) {
      //   let [type, value] = test;

      //   console.log(test);
      // }
    }
    // setSelectedTicket(event: Event) {
    //   // this.selectedTickets = { ...this.selectedTickets, [type]: amount };
    //   //@ts-ignore
    //   console.log(event.target.ɵNgSelectMultipleOption);
    //   // console.log(this.selectedTickets);
    //   // console.log({ amount, type });
    // }
  }
}
