import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ticket } from '../ticket/ticket.service';
import { Maybe, User, UserService } from './user.service';

export interface ICustomer extends User {
  credentials?: Credentials;
  tickets?: Ticket[];
  wantToSee?: [];
}

export type Credentials = {};

export class Customer {
  test = 'works';
  // customer$$: BehaviorSubject<Maybe<ICustomer>>;

  constructor() {
    // this.customer$$ = this.user;
    // this.customer$$.subscribe();
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}

  addToFavorites() {}
}
