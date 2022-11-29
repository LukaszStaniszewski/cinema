import { Injectable } from '@angular/core';

import { User } from './api.service';
type Maybe<T> = T | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class StateService {
  currentUser: Maybe<User>;
  toggleNavbarDropdown = true;
  constructor() {
    this.currentUser = null;
  }
}