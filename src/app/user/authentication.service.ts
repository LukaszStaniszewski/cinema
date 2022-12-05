import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { API } from 'src/environments/constants';
import { Admin, IAdmin } from './Admin';
import { AuthUser, ICustomer } from './AuthUser';

export type Maybe<T> = T | undefined | null;

export interface User {
  id: number;
  name: string;
  role: 'customer' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  customer$$!: BehaviorSubject<Maybe<AuthUser>>;
  admin$$!: BehaviorSubject<Maybe<Admin>>;
  constructor(protected http: HttpClient) {
    const logedUser = localStorage.getItem('currentUser');
    if (logedUser) {
      const user = JSON.parse(logedUser) as ICustomer | IAdmin;
      if (user.role === 'customer') {
        this.customer$$ = new BehaviorSubject<Maybe<AuthUser>>(
          new AuthUser(user)
        );
      } else {
        this.admin$$ = new BehaviorSubject<Maybe<Admin>>(new Admin(user));
      }
    } else {
      this.customer$$ = new BehaviorSubject<Maybe<AuthUser>>(null);
      this.admin$$ = new BehaviorSubject<Maybe<Admin>>(null);
    }
  }

  login() {
    if (
      this.isGivenUserLoggedIn(this.customer$$.value) ||
      this.isGivenUserLoggedIn(this.admin$$.value)
    )
      return;
    console.log('login');

    this.http.get<User>(`${API.LOGIN}`).subscribe((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user.role === 'customer') {
        this.customer$$.next(new AuthUser(user));
      } else {
        this.admin$$.next(new Admin(user));
      }
    });
  }

  logout() {
    if (
      !this.isGivenUserLoggedIn(this.customer$$) &&
      !this.isGivenUserLoggedIn(this.admin$$)
    )
      return;
    console.log('logout');
    localStorage.removeItem('currentUser');
    if (this.customer$$) {
      this.customer$$.next(null);
    } else {
      this.admin$$.next(null);
    }
  }

  private isGivenUserLoggedIn<T>(user: T): user is T {
    return !!user;
  }

  // updateCredentials() {}

  // addTicketToCart() {}

  // submitOrder() {}
}
