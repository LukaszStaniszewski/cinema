import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../../auth";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  hide = true;

  private router = inject(Router);
  private authService = inject(AuthenticationService);

  constructor(public auth: AuthenticationService) {}

  get currentUser$() {
    return this.authService.currentUser$;
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
    this.authService.logout();
  }
}
