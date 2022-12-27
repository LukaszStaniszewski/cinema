import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Maybe } from '../user/authentication.service';
import { CinemaRoomService } from './cinema-room/cinema-room.service';

type ReservationParams = {
  id: string;
};
@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent {
  params: Maybe<ReservationParams>;
  hide = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: CinemaRoomService
  ) {}

  get cinemaRoom$() {
    return this.movieService.cinemaRoom$;
  }

  toggleTicketDetails(isValid: boolean) {
    if (!isValid) return;
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params = params as ReservationParams;
      this.movieService.getSeatingData(this.params.id);
    });
  }
}