import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CinemaRoomService, Seat } from './cinema-room.service';

@Component({
  selector: 'app-cinema-room[seats]',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css'],
})
export class CinemaRoomComponent implements OnInit {
  @Input() seats: Seat[][] = [];
  test = false;
  constructor(private cinemaRoom: CinemaRoomService) {}

  ngOnInit(): void {}

  updateCinemaRoom(seat: Seat, event: Event) {
    const seatId = seat.position.row + seat.position.column;
    //@ts-ignore
    const clickdElementId = event.currentTarget?.id;
    //@ts-ignore
    const elementClassList = event.currentTarget?.classList;
    //@ts-ignore

    // console.log(clickdElementId, event.currentTarget?.classList);
    // this.test = !this.test;
    if (
      clickdElementId === seatId &&
      elementClassList.contains('seat--booked')
    ) {
      // console.log('hit');
      //@ts-ignore
      event.currentTarget?.classList.remove('seat--booked');
    } else if (clickdElementId === seatId) {
      //@ts-ignore
      event.currentTarget?.classList.add('seat--booked');
    }

    this.cinemaRoom.updateSeats(seat);
  }
}
