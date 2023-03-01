import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type User = {
  email: string;
  firstName: string;
  secondName: string;
  phoneNumber?: number;
};

@Injectable({
  providedIn: "root",
})
export class UserStateService {
  private userState$$ = new BehaviorSubject<User | null>(null);

  get user$() {
    return this.userState$$.asObservable();
  }

  remove() {
    this.userState$$.next(null);
  }

  set(user: User) {
    this.userState$$.next(user);
  }
}
