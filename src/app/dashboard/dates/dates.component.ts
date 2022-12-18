import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movie/movie.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  options = { day: 'numeric', month: 'numeric' };
  next7Days: string[] | undefined = [
    '05/12/2022',
    '06/12/2022',
    '07/12/2022',
    '08/12/2022',
    '09/12/2022',
    '10/12/2022',
    '11/12/2022',
  ];
  constructor(private showing: MovieService) {}

  ngOnInit(): void {
    // console.log(this.next7Days);
    // const date = new Date();
    // const dateCopy = new Date(date.getTime());
    // for (let i = 0; i <= 6; i++) {
    //   dateCopy.setDate(date.getDate() + i);
    //   this.next7Days?.push(
    //     dateCopy.toLocaleDateString('en-GB', {
    //       day: 'numeric',
    //       month: 'numeric',
    //       year: 'numeric',
    //       timeZone: 'GMT',
    //     })
    //   );
    // }
  }

  // redirectToDate(event: string) {
  //   const adjustedDate = event.replaceAll('/', '-');
  //   console.log(adjustedDate);
  //   this.showing.fetchReperoire(adjustedDate);
  // }
}
