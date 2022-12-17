import {
  Component,
  Input,
  OnInit,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Seat } from '../../../movie/movie.service';
import {
  Ticket,
  TicketInfo,
  TicketService,
} from '../../../ticket/ticket.service';
import { Maybe } from '../../../user/authentication.service';
import { Option } from '../../../ui/dropdown/dropdown.component';
import { Observable } from 'rxjs';

type Cos = {
  [key: string]: number;
};

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  ticketsInfo!: TicketInfo[];

  options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  adjustedOptions: { type: string; values: number[] } | undefined;
  option: Option | null = null;
  ticketType!: string;
  price!: number;
  totalPrice = 0;
  selectedTickets: null | Cos = null;
  maxTicketChecker = new Observable();
  tickets1: TicketInfo[] = [];

  // ticketSelected: ""
  @Input() seats: Maybe<Seat[]>;
  @Output() toggleEmitter = new EventEmitter(true);

  constructor(
    private ticketService: TicketService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.ticketService.getTicketInfo();
    // this.ticketService.ticketInfo$.subscribe((ticketInfo) => {
    //   this.ticketsInfo = ticketInfo;

    //   if (!ticketInfo[0]) return;
    //   this.mapDefaultValues(ticketInfo);
    // });
    this.ticketService.getTicketInfo();

    // this.ticketService.tickets$.subscribe((tickets) => {
    //   this.tickets1 = tickets;

    //   console.log('tickets1', this.tickets1);
    // });
  }

  get tickets$() {
    return this.ticketService.tickets$;
  }
  private mapDefaultValues(ticket: TicketInfo[]) {
    const { price, type } = ticket[0];
    this.price = price;
    this.ticketType = type;
  }

  getSelectedTicketValues(biletInfo: TicketInfo) {
    if (biletInfo.type === this.ticketType) return;
    this.price = biletInfo.price;
    this.ticketType = biletInfo.type;
  }

  getSelectedOption({
    type,
    selectedAmount,
  }: {
    type: string;
    selectedAmount: number;
  }) {
    console.log('hit');
    this.ticketService.adjustTotalTicketsAvaible(type, selectedAmount);
    console.log(this.ticketService.tickets$);
    this.changeDetectorRef.detectChanges();
    // const { type, ticketsAmount } = value;
    // this.selectedTickets = {
    //   ...this.selectedTickets,
    //   [type]: ticketsAmount,
    // };
    // this.ticketService.tickets$.subscribe((tickets) => {
    //   //@ts-ignore
    //   // this.ticketsInfo = tickets;
    // });
    // this.adjustedOptions = this.adjustOptions(type, ticketsAmount);
    // this.checkTotalOrderedTickets(this.selectedTickets);
    // this.calculateTotalPrice(type);
  }

  private adjustOptions(type: string, ticketsAmount: number) {
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log(ticketsAmount);
    return {
      type: type,
      values: options.filter((value) => ticketsAmount >= value),
    };
  }
  checkTotalOrderedTickets(obj: Cos) {
    const total = Object.values(obj).reduce((acc, curr) => acc + curr, 0);
    return total;
  }
  submit() {
    if (!this.selectedTickets) return this.toggleEmitter.emit(true);
    const total = this.checkTotalOrderedTickets(this.selectedTickets);
    if (total > 10) return;
    this.toggleEmitter.emit(true);
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
    }
  }
}
