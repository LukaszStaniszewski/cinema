/* eslint-disable @typescript-eslint/no-empty-function */

import { Ticket } from "../reservation/shared/ticket.state.service";
import { AuthenticationService, Maybe, User } from "./authentication.service";

export interface ICustomer extends User {
  // role: 'cutomer';
  credentials?: Credentials;
  tickets?: Ticket[];
  wantToSee?: [];
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Credentials = {};

export class AuthUser {
  customer: ICustomer;

  constructor(private user: ICustomer) {
    this.customer = this.user;
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}

  addToFavorites() {}
}
