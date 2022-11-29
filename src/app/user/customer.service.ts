import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends UserService {
  constructor(http: HttpClient) {
    super(http);
  }
}
