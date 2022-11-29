import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends User {
  constructor(http: HttpClient) {
    super(http);
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}
}
