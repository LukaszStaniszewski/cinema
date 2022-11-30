import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/services/api.service';
import { Maybe, UserService } from './user.service';

export class Admin {
  constructor(public user: BehaviorSubject<Maybe<User>>) {}

  modifyScreenRoom() {}
  modifyMovies() {}
}
