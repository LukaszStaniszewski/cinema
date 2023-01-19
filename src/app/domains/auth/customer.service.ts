/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject } from "rxjs";

import { Ticket } from "../reservation/shared/ticket.state.service";

export type Customer = {
  id: number;
  role: "customer";
  name: string;
  email: string;
  credentials?: Credentials;
  tickets?: Ticket[];
  wantToSee?: [];
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type Credentials = {
  email: string;
};
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  customer$$ = new BehaviorSubject<Maybe<Customer>>(null);

  constructor() {
    this.customer$$.subscribe(console.log);
  }
  get customerState$() {
    return this.customer$$.asObservable();
  }
  setCustomer(customer: Customer) {
    this.customer$$.next({ ...this.customer$$.value, ...customer });
  }
  // constructor(private user: ICustomer) {
  //   this.customer = this.user;
  // }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}

  addToFavorites() {}
}
