/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject } from "rxjs";

import { Ticket } from "../reservation/shared/ticket.state.service";

export type Customer = {
  role: "customer";
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
