import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { API } from 'src/environments/constants';
import { Ticket } from '../ticket/ticket.service';

export type Maybe<T> = T | undefined | null;

export interface User {
  id: number;
  name: string;
  role: 'customer' | 'admin';
  credentials?: Credentials;
  tickets: Ticket[];
  wantToSee: [];
}

export interface Customer extends User {}
export interface Admin extends User {}

export type Credentials = {};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$$ = new BehaviorSubject<Maybe<User>>(null);
  // currentUser: Maybe<User>;
  constructor(protected http: HttpClient) {}

  login() {
    this.http.get<User>(`${API.LOGIN}`).subscribe((user) => {
      this.currentUser$$.next(user);
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser$$.next(null);
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}
}
