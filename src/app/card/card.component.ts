import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isLoading = false;

  constructor(public movies: MovieService) {}

  // ngOnInit(): void {
  //   this.isLoading = true;
  //   // this.movies.fetchMovies();
  //   // this.isLoading = false;
  // }
  // ngAfterContentInit() {
  //   // this.isLoading = true;
  //   this.movies.fetchMovies();
  //   this.isLoading = false;
  // }
}
