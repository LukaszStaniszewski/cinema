import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seat } from '../../../movie/movie.service';
import { CinemaRoomService } from './cinema-room.service';

@Component({
  selector: 'app-cinema-room[seats]',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css'],
})
export class CinemaRoomComponent implements OnInit {
  @Input() seats: Seat[][] = [];
  constructor(private cinemaRoom: CinemaRoomService) {}

  ngOnInit(): void {}

  reserveSeat(seat: Seat) {
    this.cinemaRoom.updateSeats(seat);
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.updateSeats(seat);
  }
}
