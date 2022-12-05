import { Component, OnInit } from '@angular/core';

import {
  AuthenticationService,
  Maybe,
} from 'src/app/user/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  hide = true;
  userName: Maybe<string>;

  getUserName = () => null;
  constructor(public auth: AuthenticationService) {}

  ngOnChange(): void {
    this.userName = this.auth.customer$$.value?.customer.name;
    console.log(this.userName);
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.auth.login();
  }

  toggleDropdown() {
    if (!this.auth.admin$$ && !this.auth.customer$$) return;
    this.hide = !this.hide;
  }

  logout() {
    this.auth.logout();
    this.hide = true;
  }
}
