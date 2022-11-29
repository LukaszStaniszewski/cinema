import { HttpClient } from '@angular/common/http';
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

export class User {
  currentUser: Maybe<IUser>;
  constructor(private http: HttpClient) {}

  login() {
    return this.http.get<IUser>(`${API.LOGIN}`).pipe(retry(2));
  }

  logout() {
    this.currentUser = undefined;
  }
}
