import { Component, Input } from '@angular/core';
import { Reperoire } from '../movie/movie.service';
import { Maybe } from '../user/authentication.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isLoading = false;
  @Input() reperoire: Maybe<Reperoire> = undefined;

  constructor() {
    console.log(this.reperoire);
  }

  get movie() {
    return this.reperoire?.movie;
  }
  get hours() {
    return this.reperoire?.hours;
  }
}
