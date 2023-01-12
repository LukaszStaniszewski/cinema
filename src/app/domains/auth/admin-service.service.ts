import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

import { AuthenticationService, Maybe, User } from "./authentication.service";
export type Admin = User;
@Injectable({
  providedIn: "root",
})
export class AdminService {
  admin$$ = new BehaviorSubject<Maybe<Admin>>(null);

  constructor() {}
  setAdmin(admin: Admin) {
    this.admin$$.next({ ...this.admin$$.value, ...admin });
  }
  modifyScreenRoom() {}
  modifyMovies() {}
}
