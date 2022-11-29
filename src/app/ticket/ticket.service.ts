import { Injectable } from '@angular/core';
import { Maybe } from '../user/user.service';

export type Ticket = {
  id: number;
  type: TicketType;
  price: number;
  seat: string;
  date: string;
  movieTitle: string;
};

type TicketType = 'normal' | 'concessionary' | 'family' | 'voucher';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  ticket: Maybe<Ticket>;
  price: number;

  constructor() {
    this.price = this.ticket?.price || 0;
  }

  add() {}

  delete() {}

  update() {}

  calculatePrice() {
    switch (this.ticket?.type) {
      case 'concessionary':
        return this.concessionaryTicket(this.price);
      case 'family':
        return this.familyTicket(this.price);
      default:
        return this.price;
    }
  }

  private concessionaryTicket(price: number) {
    return price / 2;
  }
  private familyTicket(price: number) {
    return price / 1.5;
  }
  private voucher(price: number) {
    return price;
  }
}
