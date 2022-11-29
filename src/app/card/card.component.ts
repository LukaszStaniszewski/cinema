import { Component, Input, OnInit } from '@angular/core';
import { Movie, MovieService } from '../movie/movie.service';
import { Maybe } from '../user/user.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isLoading = false;
  @Input() movie: Maybe<Movie> = undefined;

  constructor() {}
}
