import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Ticket } from '../reservation/ticket-details/ticket.service';
import { Maybe, User, AuthenticationService } from './authentication.service';

export interface ICustomer extends User {
  // role: 'cutomer';
  credentials?: Credentials;
  tickets?: Ticket[];
  wantToSee?: [];
}

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
