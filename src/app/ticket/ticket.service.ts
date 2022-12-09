import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
};

type TicketType = 'normal' | 'concessionary' | 'family' | 'voucher';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticket$$ = new BehaviorSubject<TicketInfo[]>([]);
  price = 0;

  constructor(private http: HttpClient) {}

  get ticketInfo$() {
    return this.ticket$$.asObservable();
  }

  delete() {}

  update() {}

  addTicketToCart() {}

  getTicketInfo() {
    this.http.get<TicketInfo[]>(API.TICKET_INFO).subscribe((ticketInfo) => {
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
