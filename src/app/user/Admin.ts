import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/services/api.service';
import { Maybe, UserService } from './user.service';

export interface IAdmin extends User {}
export class Admin {
  admin: BehaviorSubject<IAdmin>;
  constructor(public user: IAdmin) {
    this.admin = new BehaviorSubject(user);
  }

  modifyScreenRoom() {}
  modifyMovies() {}
}
