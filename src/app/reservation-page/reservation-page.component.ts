import { Component, OnInit } from '@angular/core';

const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const;

// type Seats =
@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent implements OnInit {
  seatsNum: typeof seats;
  constructor() {
    this.seatsNum = seats;
  }

  ngOnInit(): void {}
}
