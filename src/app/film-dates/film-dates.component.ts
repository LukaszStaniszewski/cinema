import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'FilmDates',
  templateUrl: './film-dates.component.html',
  styleUrls: ['./film-dates.component.css'],
})
export class FilmDatesComponent implements OnInit {
  options = { day: 'numeric', month: 'numeric' };
  next7Days: string[] | undefined = [];
  constructor(private showing: MovieService) {}

  ngOnInit(): void {
    console.log(this.next7Days);
    const date = new Date();
    const dateCopy = new Date(date.getTime());
    for (let i = 0; i <= 6; i++) {
      dateCopy.setDate(date.getDate() + i);

      this.next7Days?.push(
        dateCopy.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          timeZone: 'GMT',
        })
      );
    }
  }

  redirectToDate(event: string) {
    const adjustedDate = event.replaceAll('/', '-');
    console.log(adjustedDate);
    this.showing.fetchShowings(adjustedDate);
  }
}
