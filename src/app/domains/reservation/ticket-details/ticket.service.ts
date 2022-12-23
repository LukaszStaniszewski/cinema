import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { API } from 'src/environments/constants';
import { CinemaRoomService } from '../cinema-room/cinema-room.service';
import { User } from 'src/app/domains/user/authentication.service';

export type Ticket = {
  type: TicketTypes;
  price: number;
  pickedTickets: number;
  maxTicketsToPick: number;
  ticketsLeft: number;
};
const defaultTickets: Ticket = {
  type: 'normalny',
  price: 20,
  pickedTickets: 4,
  maxTicketsToPick: 10,
  ticketsLeft: 10,
};

export type TicketTypes = 'normalny' | 'concessionary' | 'family' | 'voucher';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticket$$ = new BehaviorSubject<Ticket[]>([defaultTickets]);

  constructor(private http: HttpClient) {}

  get tickets$() {
    return this.ticket$$.asObservable();
  }

  get ticketsValue() {
    return this.ticket$$.value;
  }

  getTicketInfo() {
    this.http
      .get<Ticket[]>(API.TICKET_INFO)
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
    this.ticket$$.subscribe((tickets) => {
      console.log(tickets);
    });
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
