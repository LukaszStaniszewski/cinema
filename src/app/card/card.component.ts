import { Component, Input, OnInit } from '@angular/core';
import { MovieService, Showing } from '../movie/movie.service';
import { Maybe } from '../user/authentication.service';

@Component({
  selector: 'Card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  isLoading = false;
  @Input() showing: Maybe<Showing> = undefined;

  get movie() {
    return this.showing?.movie;
  }
}

// interface Showing {
//   id: string,
//   date: Date,
//   time: [{cinemaRoomId: "cinema-room-1", time: "13:00"}, {cinemaRoomId: "cinema-room-2", time: "13:00"}]
// }
