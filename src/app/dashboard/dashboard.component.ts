import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/services/state.service';
import { MovieService } from '../movie/movie.service';

const HEROES = [
  { id: 1, name: 'Superman' },
  { id: 2, name: 'Batman' },
  { id: 5, name: 'BatGirl' },
  { id: 3, name: 'Robin' },
  { id: 4, name: 'Flash' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoading = true;

  constructor(public showings: MovieService) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.movies.fetchMovies();
    // this.isLoading = false;
    // this.movies.fetchMovies();
  }
  ngAfterContentInit() {
    // this.isLoading = true;
    this.showings.fetchShowings('');
  }
  ngOnChanges() {
    if (this.showings.movies) {
      this.showings.fetchShowings('');
      console.log(this.showings.movies);
      this.isLoading = false;
    }
  }
}
