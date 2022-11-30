import { Component, OnInit } from '@angular/core';

import { User, UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hide = true;
  constructor(public user: UserService) {}

  ngOnInit(): void {}

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.user.login();
  }

  toggleDropdown() {
    if (!this.user.currentUser$$) return;
    this.hide = !this.hide;
  }

  logout() {
    this.user.logout();
    this.hide = true;
  }
}
