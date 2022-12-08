import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seat } from '../movie/movie.service';

@Component({
  selector: 'app-cinema-room[seats]',
  templateUrl: './cinema-room.component.html',
  styleUrls: ['./cinema-room.component.css'],
})
export class CinemaRoomComponent implements OnInit {
  @Input() seats: Seat[][] = [];
  @Output() seatToUpdate = new EventEmitter<Seat>();
  constructor() {}

  ngOnInit(): void {}
  setSeat(seat: Seat) {
    this.seatToUpdate.emit(seat);
  }
}
