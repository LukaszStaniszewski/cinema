import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService, UserStateService } from "../../auth";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  hide = true;

  private router = inject(Router);
  private userService = inject(UserStateService);
  private authService = inject(AuthService);

  get currentUser$() {
    return this.userService.user$;
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.router.navigate(["/login"]);
  }

  toggleDropdown() {
    this.hide = !this.hide;
  }

  logout() {
    this.authService.logout();
  }
}
