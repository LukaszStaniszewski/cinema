import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { API } from 'src/environments/constants';

export type Maybe<T> = T | undefined | null;

export type IUser = {
  id: number;
  name: string;
  role: 'customer' | 'admin';
  credentials?: Credentials;
};

export type Credentials = {};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: Maybe<IUser>;
  constructor(protected http: HttpClient) {}

  login() {
    return this.http.get<IUser>(`${API.LOGIN}`).pipe(retry(2));
  }

  logout() {
    this.currentUser = undefined;
  }

  updateCredentials() {}

  addTicketToCart() {}

  submitOrder() {}
}
