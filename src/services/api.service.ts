import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { API } from 'src/environments/constants';

export type User = {
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser(userId: string) {
    return this.http
      .get<User>(`${API.LOGIN}`, {
        withCredentials: true,
        responseType: 'json',
      })
      .pipe(retry(2));
  }
}
