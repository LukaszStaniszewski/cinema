import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export type Admin = {
  id: number;
  name: string;
  email: string;
  role: "admin";
};
@Injectable({
  providedIn: "root",
})
export class AdminService {
  admin$$ = new BehaviorSubject<Maybe<Admin>>(null);

  setAdmin(admin: Admin) {
    this.admin$$.next({ ...this.admin$$.value, ...admin });
  }
}
