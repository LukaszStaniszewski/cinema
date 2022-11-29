import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/user/user.service';
import { ApiService, User } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hide = true;
  constructor(private user: UserService, public state: StateService) {}

  ngOnInit(): void {
    const logedUser = localStorage.getItem('currentUser');
    if (!logedUser) return;
    this.state.currentUser = JSON.parse(logedUser);
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.user.login().subscribe((user) => {
      this.user.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  toggleDropdown() {
    if (!this.state.currentUser) return;
    this.hide = !this.hide;
    this.state.toggleNavbarDropdown = this.hide;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.user.currentUser = null;
    this.hide = true;
  }
}
