import { Component, inject } from "@angular/core";
import { AuthService, UserStateService } from "@domains/auth";
import { useNavigate } from "@shared/inject-hooks";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  hide = true;

  private useNavigate = useNavigate();
  private userService = inject(UserStateService);
  private authService = inject(AuthService);

  get currentUser$() {
    return this.userService.user$;
  }

  get authState$() {
    return this.authService.authState$;
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.useNavigate("/login");
  }

  toggleDropdown() {
    this.hide = !this.hide;
  }

  logout() {
    this.authService.logout();
  }
}
