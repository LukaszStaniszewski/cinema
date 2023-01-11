import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { AuthenticationService, Maybe, User } from './authentication.service';
export type IAdmin = User
export class Admin {
  admin: IAdmin;
  constructor(private user: IAdmin) {
    this.admin = this.user;
  }

  modifyScreenRoom() {}
  modifyMovies() {}
}
