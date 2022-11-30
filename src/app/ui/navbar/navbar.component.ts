import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/user/Admin';
import { Customer } from 'src/app/user/Customer';

import { User, UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hide = true;
  constructor(public user: UserService) {}

  ngOnInit(): void {
    this.user.currentUser$$.subscribe((user) => {
      if (typeof user?.optional === typeof Customer) {
        // console.log(user?.optional?.test);
      }
    });
    // console.log(this.user.currentUser$$.value?.optional?.test);
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    this.user.login();
    // console.log(this.user.currentUser$$.value?.optional?.test);
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
