import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Maybe, AuthenticationService, User } from './authentication.service';
export interface IAdmin extends User {
  // role: 'admin';
}
export class Admin {
  admin: IAdmin;
  constructor(private user: IAdmin) {
    this.admin = this.user;
  }

  modifyScreenRoom() {}
  modifyMovies() {}
}
