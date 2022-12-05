import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie/movie.service';
import { Maybe } from '../user/authentication.service';

const seatsCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const seatsRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
// type Seats =

type ReservationParams = {
  id: string;
  time: string;
};
@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent {
  seatsNum: typeof seatsCol;
  seatsChar: typeof seatsRow;
  params: Maybe<ReservationParams>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params as ReservationParams;
    });
    // console.log(this.route.snapshot.params['id']);

    // console.log(this.route.data);

    this.seatsNum = seatsCol;
    this.seatsChar = seatsRow;
  }

  get movie() {
    return this.movieService.movie$$.value;
  }

  ngOnInit(): void {
    // if (!this.params) return;
    // this.movieService.fetchMovie(this.params?.id);
  }
}
