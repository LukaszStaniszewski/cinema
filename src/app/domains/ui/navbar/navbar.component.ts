import { Component, inject } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Maybe } from "@shared/utility-types";

import { AuthenticationService } from "../../auth";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  hide = true;
  userName: Maybe<string>;

  private router = inject(Router);

  getUserName = () => null;

  constructor(public auth: AuthenticationService) {}

  ngOnChange(): void {
    // this.userName = this.auth.customer$$.value?.customer.name;
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.router.navigate(["/login"]);
  }

  toggleDropdown() {
    // if (!this.auth.admin$$ && !this.auth.custo mer$$) return;
    this.hide = !this.hide;
  }

  logout() {
    // this.auth.logout();
    this.hide = true;
  }
}
