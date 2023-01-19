import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { API } from "src/environments/constants";

import { Admin, AdminService } from "./admin-service.service";
import { Customer, CustomerService } from "./customer.service";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
}
type Auth = {
  authType: "none" | "admin" | "customer";
};
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private auth$$ = new BehaviorSubject<Auth>({ authType: "none" });
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private adminService: AdminService
  ) {
    // const logedUser = localStorage.getItem("currentUser");
    // if (logedUser) {
    //   const user = JSON.parse(logedUser) as Customer | Admin;
    //   if (user.role === "customer") {
    //     this.customer$$ = new BehaviorSubject<Maybe<AuthUser>>(new AuthUser(user));
    //   } else {
    //     this.admin$$ = new BehaviorSubject<Maybe<Admin>>(new Admin(user));
    //   }
    // } else {
    //   this.customer$$ = new BehaviorSubject<Maybe<AuthUser>>(null);
    //   this.admin$$ = new BehaviorSubject<Maybe<Admin>>(null);
    // }
  }
  login(userCredentials: { email: string; password: string }) {
    this.http.post<User>(`${API.LOGIN}`, userCredentials).subscribe({
      next: user => {
        this.auth$$.next({ authType: user.role });
        if (this.isGivenUserLoggedIn<Customer>(user, "customer")) {
          this.customerService.setCustomer(user);
        } else if (this.isGivenUserLoggedIn<Admin>(user, "admin")) {
          this.adminService.setAdmin(user);
        }
      },
      error: () => this.auth$$.next({ authType: "none" }),
    });
  }

  private isGivenUserLoggedIn<T extends User>(
    user: User,
    role: "customer" | "admin"
  ): user is T {
    return user.role === role;
  }
}
