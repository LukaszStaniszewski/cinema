import { Component, Input, OnInit } from '@angular/core';

import { CinemaRoomService, Seat } from './cinema-room.service';

@Component({
  selector: 'app-cinema-room[seats]',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css'],
})
export class CinemaRoomComponent implements OnInit {
  @Input() seats: Seat[][] = [];

  constructor(private cinemaRoom: CinemaRoomService) {}

  ngOnInit(): void {}

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.updateSeats(seat);
  }
}
