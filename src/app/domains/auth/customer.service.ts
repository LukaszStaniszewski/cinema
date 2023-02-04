/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject } from "rxjs";

export type Customer = {
  role: "customer";
  name: string;
  email: string;
  credentials?: Credentials;
};

export type Credentials = {
  email: string;
};
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  customer$$ = new BehaviorSubject<Maybe<Customer>>(null);

  constructor() {
    // this.customer$$.subscribe(console.log);
  }
  get customerState$() {
    return this.customer$$.asObservable();
  }
  setCustomer(customer: Customer) {
    this.customer$$.next({ ...this.customer$$.value, ...customer });
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}

  addToFavorites() {}
}
