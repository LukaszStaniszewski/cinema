import { Component, OnInit } from '@angular/core';

const seatsCol = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
] as const;
const seatsRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'] as const;
// type Seats =
@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent implements OnInit {
  seatsNum: typeof seatsCol;
  seatsChar: typeof seatsRow;
  constructor() {
    this.seatsNum = seatsCol;
    this.seatsChar = seatsRow;
  }

  ngOnInit(): void {}
}
