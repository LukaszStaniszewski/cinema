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
  authType: false | "admin" | "customer";
};
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private auth$$ = new BehaviorSubject<Auth>({ authType: false });
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private adminService: AdminService
  ) {
    // const logedUser = localStorage.getItem("currentUser");
    // if (logedUser) {
    //   const user = JSON.parse(logedUser) as ICustomer | IAdmin;
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
      error: () => this.auth$$.next({ authType: false }),
    });
  }

  private isGivenUserLoggedIn<T extends User>(
    user: User,
    role: "customer" | "admin"
  ): user is T {
    return user.role === role;
  }

  // login() {
  //   if (
  //     this.isGivenUserLoggedIn(this.customer$$.value) ||
  //     this.isGivenUserLoggedIn(this.admin$$.value)
  //   )
  //     return;
  //   this.http.get<User>(`${API.LOGIN}`).subscribe(user => {
  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     if (user.role === "customer") {
  //       this.customer$$.next(new AuthUser(user));
  //     } else {
  //       this.admin$$.next(new Admin(user));
  //     }
  //   });
  // }

  // logout() {
  //   if (
  //     !this.isGivenUserLoggedIn(this.customer$$) &&
  //     !this.isGivenUserLoggedIn(this.admin$$)
  //   )
  //     return;
  //   localStorage.removeItem("currentUser");
  //   if (this.customer$$) {
  //     this.customer$$.next(null);
  //   } else {
  //     this.admin$$.next(null);
  //   }
  // }

  // private isGivenUserLoggedIn<T>(user: T): user is T {
  //   return !!user;
  // }

  // updateCredentials() {}

  // addTicketToCart() {}

  // submitOrder() {}
}
