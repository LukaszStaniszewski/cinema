import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject, map } from "rxjs";
import { API } from "src/environments/constants";

import { Admin, AdminService } from "./admin-service.service";
import { Customer, CustomerService } from "./customer.service";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
}
type AuthType = "none" | "admin" | "customer";

type AuthState = {
  authType: AuthType;
  user: Maybe<User>;
};
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private auth$$ = new BehaviorSubject<AuthState>({ authType: "none", user: null });
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private adminService: AdminService
  ) {}

  get currentUser$() {
    return this.auth$$.pipe(map(state => state.user));
  }

  autoLogin() {
    this.http.get<User>(API.CURRENT_USER).subscribe({
      next: user => this.setUser(user),

      error: () => this.auth$$.next({ authType: "none", user: null }),
    });
  }

  login(userCredentials: { email: string; password: string }) {
    this.http.post<User>(`/login`, userCredentials).subscribe({
      next: user => this.setUser(user),

      error: () => this.auth$$.next({ authType: "none", user: null }),
    });
  }
  private setUser(user: User) {
    this.auth$$.next({ authType: user.role, user: user });
  }

  // private setUser(user: User) {
  //   this.auth$$.next({ authType: user.role });
  //   if (this.isGivenUserLoggedIn<Customer>(user, "customer")) {
  //     this.customerService.setCustomer(user);
  //   } else if (this.isGivenUserLoggedIn<Admin>(user, "admin")) {
  //     this.adminService.setAdmin(user);
  //   }
  // }

  private isGivenUserLoggedIn<T extends User>(
    user: User,
    role: "customer" | "admin"
  ): user is T {
    return user.role === role;
  }
}
