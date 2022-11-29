import { Component, OnInit } from '@angular/core';
import { fromEvent, windowToggle } from 'rxjs';
import { ApiService, User } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dashboard = document.getElementById('dashboard') as HTMLElement;
  hide = true;
  constructor(private apiService: ApiService, public state: StateService) {}

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
    this.apiService.getUser('lukasz').subscribe((user) => {
      this.state.currentUser = user;
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
    this.state.currentUser = null;
    this.hide = true;
  }
}
