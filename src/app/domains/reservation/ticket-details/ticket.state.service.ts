import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { API } from 'src/environments/constants';

export type Ticket = {
  type: TicketTypes;
  price: number;
  pickedTickets: number;
  maxTicketsToPick: number;
  ticketsLeft: number;
};

export type TicketState = {
  tickets: Ticket[];
  totalPrice: number;
};

const defaultTickets: TicketState = {
  tickets: [
    {
      type: 'normalny',
      price: 20,
      pickedTickets: 4,
      maxTicketsToPick: 10,
      ticketsLeft: 10,
    },
  ],
  totalPrice: 80,
};

export type TicketTypes = 'normalny' | 'concessionary' | 'family' | 'voucher';

@Injectable({
  // providedIn: ReservationModule,
  providedIn: 'root',
})
export class TicketStateService {
  private ticket$$ = new BehaviorSubject<TicketState>(defaultTickets);

  constructor(private http: HttpClient) {}

  get tickets$() {
    return this.ticket$$.asObservable();
  }

  get ticketsValue() {
    return this.ticket$$.value;
  }
  ngOnDestroy(): void {
    this.ticket$$.unsubscribe();
  }
  getTicketInfo() {
    this.http
      .get<Ticket[]>(API.TICKET_INFO)
      .pipe(
        map((ticketsInfo) => {
          return {
            tickets: ticketsInfo.map((ticketInfo) => {
              return {
                ...ticketInfo,
                pickedTickets: 0,
                maxTicketsToPick: 10,
                ticketsLeft: 10,
              };
            }),
            totalPrice: 0,
          };
        })
      )
      .subscribe((ticketInfo) => {
        this.ticket$$.next(ticketInfo);
      });
  }

  calculateChoosenTicketsAmount() {
    return this.ticket$$.value.tickets.reduce(
      (acc, value) => value.pickedTickets + acc,
      0
    );
  }

  adjustTotalTicketsAvaible(type: string, selectedTicketsAmount: number) {
    this.calculateChoosenTicketsPerType(type, selectedTicketsAmount);

    this.calculateTicketsLeftPerType(type);
    this.ticket$$.subscribe((tickets) => {
      console.log(tickets);
    });
  }

  private calculateChoosenTicketsPerType(type: string, ticketsAmount: number) {
    this.ticket$$.next({
      tickets: this.ticket$$.value.tickets.map((ticket) => {
        if (ticket.type === type) {
          return {
            ...ticket,
            pickedTickets: ticketsAmount,
          };
        }
        return ticket;
      }),
      totalPrice: this.ticket$$.value.totalPrice,
    });
  }

  private calculateTicketsLeftPerType(type: string) {
    let pickedTotal = this.calculateChoosenTicketsAmount();

    this.ticket$$.next({
      tickets: this.ticket$$.value.tickets.map((ticket) => {
        let diff = ticket.maxTicketsToPick - pickedTotal;
        let num = diff < 0 ? 0 : diff;
        if (ticket.type !== type) {
          return {
            ...ticket,
            ticketsLeft: num,
          };
        }
        return ticket;
      }),
      totalPrice: this.ticket$$.value.totalPrice,
    });
  }

  delete() {}

  update() {}

  addTicketToCart() {}
}
