import { Component, Input } from '@angular/core';
import { Reperoire } from '../../movie/movie.service';
import { Showing } from '../services/showings/showing-state.service';
import { Maybe } from '../../user/authentication.service';

@Component({
  selector: 'app-card[showing]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isLoading = false;
  @Input() showing!: Showing;

  constructor() {
    console.log('inCArd', this.showing);
  }

  get movie() {
    return this.showing.movie;
  }
  get hours() {
    return this.showing.available;
  }
}
