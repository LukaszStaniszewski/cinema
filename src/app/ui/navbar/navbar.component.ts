import { Component, OnInit } from '@angular/core';
import { fromEvent, windowToggle } from 'rxjs';
import { CustomerService } from 'src/app/user/customer.service';
import { ApiService, User } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hide = true;
  constructor(private customer: CustomerService, public state: StateService) {}

  ngOnInit(): void {
    const logedUser = localStorage.getItem('currentUser');
    if (!logedUser) return;
    this.state.currentUser = JSON.parse(logedUser);
  }

  clickedOutside() {
    this.hide = true;
  }

  login() {
    // if(this,s)
    this.customer.login().subscribe((user) => {
      this.customer.currentUser = user;
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
    this.customer.currentUser = null;
    this.hide = true;
  }
}
