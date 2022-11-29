import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/services/api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends UserService {
  constructor(http: HttpClient) {
    super(http);
  }

  modifyScreenRoom() {}
  modifyMovies() {}
}
