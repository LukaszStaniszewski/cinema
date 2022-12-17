import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { API } from 'src/environments/constants';
import { Maybe, User } from '../user/authentication.service';

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
  type: string;
  price: number;
  pickedTickets: number;
  maxTicketsToPick: number;
};
export type Option = {
  value: { ticketsAmount: number; type: string };
  repeatAmount: number;
};
type TicketType = 'normal' | 'concessionary' | 'family' | 'voucher';

type Test = {
  maxTotal: number;
  pickedTickets: Record<TicketType, number>[] | [];
};

type Test2 = {
  type: string;
  ticketsAmount: number;
};
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticket$$ = new BehaviorSubject<TicketInfo[]>([]);
  // private ticketState$$ = new BehaviorSubject<Test2>({
  //   type: '',
  //   maxTotal: 10,
  //   currentTotal: 0
  // });

  price = 0;

  constructor(private http: HttpClient) {}

  get tickets$() {
    return this.ticket$$.asObservable();
  }

  get ticketsValue() {
    return this.ticket$$.value;
  }

  // get ticketState$() {
  //   return this.ticketState$$;
  // }
  delete() {}

  update() {}

  addTicketToCart() {}

  // adjustTotalTicketsAvaible(type: string, amount: number) {
  //   this.ticketState$$.next({
  //     maxTotal: 10,
  //     pickedTickets: [...this.ticketState$$.value.pickedTickets, ]
  //   });
  // }

  adjustTotalTicketsAvaible(type: string, ticketsAmount: number) {
    console.log(ticketsAmount);

    // this.ticket$$
    //   .pipe(
    //     map((ticketsInfo) =>
    //       ticketsInfo.map((ticketInfo) => {
    //         if (ticketInfo.type === type) {
    //           return {
    //             ...ticketInfo,
    //             pickedTickets: ticketsAmount,
    //           };
    //         }
    //         return ticketInfo;
    //       })
    //     )
    //   )
    //   .subscribe((tickets) => {
    //     this.ticket$$.next(tickets);
    //   });
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
    console.log(this.ticket$$.value);
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
            };
          })
        )
      )
      .subscribe((ticketInfo) => {
        // console.log(ticketInfo);

        this.ticket$$.next(ticketInfo);
      });
  }

  // calculatePrice() {
  //   switch (this.ticket?.type) {
  //     case 'concessionary':
  //       return this.concessionaryTicket(this.price);
  //     case 'family':
  //       return this.familyTicket(this.price);
  //     default:
  //       return this.price;
  //   }
  // }

  // private concessionaryTicket(price: number) {
  //   return price / 2;
  // }
  // private familyTicket(price: number) {
  //   return price / 1.5;
  // }
  // private voucher(price: number) {
  //   return price;
  // }
}
