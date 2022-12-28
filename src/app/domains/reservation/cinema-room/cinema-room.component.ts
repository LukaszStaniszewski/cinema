import { Component, Input, OnInit } from '@angular/core';

import { CinemaRoomStateService, Seat } from './cinema-room.state.service';

@Component({
  selector: 'app-cinema-room[seats]',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css'],
})
export class CinemaRoomComponent implements OnInit {
  @Input() seats: Seat[][] = [];

  constructor(private cinemaRoom: CinemaRoomStateService) {}

  ngOnInit(): void {}

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.updateSeats(seat);
  }
}
