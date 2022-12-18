import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { API } from 'src/environments/constants';
import { User } from '../user/authentication.service';

export type Ticket = {
  id: number;
  type: TicketType;
  price: number;
  seat: string;
  date: string;
  movieTitle: string;
  owner: User['id'];
};

export type TicketInfo = {
  type: TicketType;
  price: number;
  pickedTickets: number;
  maxTicketsToPick: number;
  ticketsLeft: number;
  totalTickets: number;
};

export type TicketType = 'normal' | 'concessionary' | 'family' | 'voucher';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticket$$ = new BehaviorSubject<TicketInfo[]>([]);

  constructor(private http: HttpClient) {}

  get tickets$() {
    return this.ticket$$.asObservable();
  }

  getTicketInfo() {
    this.http
      .get<TicketInfo[]>(API.TICKET_INFO)
      .pipe(
        map((ticketsInfo) =>
          ticketsInfo.map((ticketInfo) => {
            return {
              ...ticketInfo,
              pickedTickets: 0,
              maxTicketsToPick: 10,
              ticketsLeft: 10,
            };
          })
        )
      )
      .subscribe((ticketInfo) => {
        this.ticket$$.next(ticketInfo);
      });
  }

  calculateChoosenTicketsAmount() {
    return this.ticket$$.value.reduce(
      (acc, value) => value.pickedTickets + acc,
      0
    );
  }

  adjustTotalTicketsAvaible(type: string, selectedTicketsAmount: number) {
    this.calculateChoosenTicketsPerType(type, selectedTicketsAmount);

    this.calculateTicketsLeftPerType(type);
  }

  private calculateChoosenTicketsPerType(type: string, ticketsAmount: number) {
    this.ticket$$.next(
      this.ticket$$.value.map((ticket) => {
        if (ticket.type === type) {
          return {
            ...ticket,
            pickedTickets: ticketsAmount,
          };
        }
        return ticket;
      })
    );
  }

  private calculateTicketsLeftPerType(type: string) {
    let pickedTotal = this.calculateChoosenTicketsAmount();

    this.ticket$$.next(
      this.ticket$$.value.map((ticket) => {
        let diff = ticket.maxTicketsToPick - pickedTotal;
        let num = diff < 0 ? 0 : diff;
        if (ticket.type !== type) {
          return {
            ...ticket,
            ticketsLeft: num,
          };
        }
        return ticket;
      })
    );
  }

  delete() {}

  update() {}

  addTicketToCart() {}
}
