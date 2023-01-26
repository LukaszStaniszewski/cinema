import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { useNavigate } from "@shared/inject-hooks";
import { Maybe } from "@shared/utility-types";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, map } from "rxjs";
import { API } from "src/environments/constants";

import { Admin, AdminService } from "./admin-service.service";
import { Customer, CustomerService } from "./customer.service";

export type LoginCredentials = {
  email: string;
  password: string;
};
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
  private navigate = useNavigate();
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  constructor() {
    this.auth$$.subscribe(console.log);
  }

  get currentUser$() {
    return this.auth$$.pipe(map(state => state.user));
  }

  get authState() {
    return this.auth$$.value;
  }

  autoLogin() {
    this.http.get<User>(API.CURRENT_USER).subscribe({
      next: user => this.setUser(user),

      error: () => this.auth$$.next({ authType: "none", user: null }),
    });
  }

  login(userCredentials: { email: string; password: string }) {
    this.http.post<User>(`/login`, userCredentials).subscribe({
      next: user => {
        this.setUser(user);
        this.navigate("/");
      },

      error: () => this.auth$$.next({ authType: "none", user: null }),
    });
  }

  logout() {
    this.cookieService.delete("accessToken", "/");
    this.setUser(null);
  }

  private setUser(user: User | null) {
    this.auth$$.next({
      ...this.auth$$.value,
      authType: user?.role ?? "none",
      user: user,
    });
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
