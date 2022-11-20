import { Component, OnInit } from '@angular/core';
import { ApiService, User } from 'src/services/api.service';
import { StateService } from 'src/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private apiService: ApiService, public state: StateService) {}

  ngOnInit(): void {
    const logedUser = localStorage.getItem('currentUser');
    if (!logedUser) return;
    this.state.currentUser = JSON.parse(logedUser);
  }

  login() {
    this.apiService.getUser('lukasz').subscribe((user) => {
      this.state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }
}
