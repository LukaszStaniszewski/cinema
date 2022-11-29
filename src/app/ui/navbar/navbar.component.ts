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

  ngOnInit(): void {
    const logedUser = localStorage.getItem('currentUser');
    if (!logedUser) return;
    this.user.currentUser$$.next(JSON.parse(logedUser));
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    if (this.user.currentUser$$.value) return;
    // this.user.login().subscribe((user) => {
    //   this.user.currentUser = user;
    //   localStorage.setItem('currentUser', JSON.stringify(user));
    // });
    this.user.login();

    this.user.currentUser$$.subscribe((user) => {
      // kiedy to sie wywoluje, czy gdy tylko funkcja jest wywolana, czy tez gdy zmienia sie wartosc subjecta
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
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
