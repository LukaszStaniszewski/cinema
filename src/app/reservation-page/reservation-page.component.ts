import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Seat } from '../movie/movie.service';
import { Maybe } from '../user/authentication.service';

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
  seats: Maybe<Seat[][]>;
  selectedSeat: Maybe<Seat>;
  hide = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.movieService.cinemaRoom$.subscribe((room) => {
      this.seats = room?.seats;
    });
  }

  get movie() {
    return this.movieService.movie$$.value;
  }
  reserveSeat(seat: Seat) {
    this.movieService.updateSeats(seat);
  }

  updateCinemaRoom(seat: Seat) {
    this.selectedSeat = seat;
    this.movieService.updateSeats(seat);
  }
  // ngOnDestroy() {

  // }
  toggleDropdown(isValid: boolean) {
    console.log(isValid);
    if (!isValid) return;
    // console.log('toggle', event);
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.params = params as ReservationParams;
      this.movieService.fetchShowing(this.params.id);
    });
  }
}
