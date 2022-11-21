import { Component, OnInit } from '@angular/core';
import { ApiService, User } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hide = true;
  constructor(private apiService: ApiService, public state: StateService) {}

  ngOnInit(): void {
    const logedUser = localStorage.getItem('currentUser');
    if (!logedUser) return;
    this.state.currentUser = JSON.parse(logedUser);
  }

  login() {
    // if(this,s)
    this.apiService.getUser('lukasz').subscribe((user) => {
      this.state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }
  fun(event: MouseEvent) {
    console.log(event);
    if (event.screenY < 150) return;

    this.hide = true;
  }

  toggleDropdown() {
    if (!this.state.currentUser) return;
    this.hide = !this.hide;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.state.currentUser = null;
    this.hide = true;
  }
}
