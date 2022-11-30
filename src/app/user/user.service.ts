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
  currentUser$$: BehaviorSubject<Maybe<User>>;
  // currentUser: Maybe<User>;
  constructor(protected http: HttpClient) {
    const logedUser = localStorage.getItem('currentUser');
    if (logedUser) {
      this.currentUser$$ = new BehaviorSubject<Maybe<User>>(
        JSON.parse(logedUser)
      );
      return;
    }
    this.currentUser$$ = new BehaviorSubject<Maybe<User>>(null);
  }

  login() {
    if (this.isUserLoggedIn()) return;
    this.http.get<User>(`${API.LOGIN}`).subscribe((user) => {
      this.currentUser$$.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  logout() {
    if (!this.isUserLoggedIn()) return;
    localStorage.removeItem('currentUser');
    this.currentUser$$.next(null);
  }
  private isUserLoggedIn() {
    return !!this.currentUser$$.value;
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}
}
