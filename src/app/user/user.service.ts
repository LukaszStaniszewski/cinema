import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { API } from 'src/environments/constants';
import { Ticket } from '../ticket/ticket.service';
import { Admin } from './Admin';
import { Customer } from './Customer';

export type Maybe<T> = T | undefined | null;

export interface User<T extends Customer | Admin = Customer> {
  id: number;
  name: string;
  role: 'customer' | 'admin';
  optional?: T;
}

// export interface Admin extends User {}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$$: BehaviorSubject<Maybe<User<Customer | Admin>>>;
  // currentUser: Maybe<User>;
  constructor(protected http: HttpClient) {
    const logedUser = localStorage.getItem('currentUser');
    if (logedUser) {
      this.currentUser$$ = new BehaviorSubject<Maybe<User<Customer | Admin>>>(
        JSON.parse(logedUser)
      );
      return;
    }
    this.currentUser$$ = new BehaviorSubject<Maybe<User<Customer | Admin>>>(
      null
    );

    // if (this.currentUser$$.value?.role === 'admin') {
    //   // new Admin(this.currentUser$$);
    // } else {
    // new Customer(this.currentUser$$);
    if (!this.currentUser$$.value) return;
    console.log('hit');

    // }
  }

  login() {
    if (this.isUserLoggedIn()) return;
    this.http.get<User>(`${API.LOGIN}`).subscribe((user) => {
      if (user.role === 'customer') {
        this.currentUser$$.next({ ...user, optional: new Customer() });
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
    });

    // this.currentUser$$.next({
    //   ...this.currentUser$$.value,
    //   optional: new Customer(),
    // });
  }

  logout() {
    if (!this.isUserLoggedIn()) return;
    localStorage.removeItem('currentUser');
    this.currentUser$$.next(null);
  }
  private isUserLoggedIn() {
    return !!this.currentUser$$.value;
  }

  // updateCredentials() {}

  // addTicketToCart() {}

  // submitOrder() {}b
}
