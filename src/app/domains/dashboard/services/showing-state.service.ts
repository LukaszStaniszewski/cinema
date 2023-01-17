import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { API } from "src/environments/constants";

import { DashboardModule } from "../dashboard.modules";

type Maybe<T = null> = {
  isAvailable: boolean;
  value?: T;
};
// type Maybe<T> = T  ? Test : {isAvailable: false};
type Movie = {
  id: string;
  title: string;
  image: string;
  genre: string;
  pg: string;
  descriptionShort: string;
  descriptionLong: string;
  descriptionExtra: {
    actors: string[];
  };
  rating: string;
  votesNumber: number;
  premiere: boolean;
  runTime: number;
};
interface Test {
  movie: Movie;
  isAvailable: true;
}

export type Availability = {
  // movieId: 'string';
  time: string;
  cinemaRoomId: RoomId;
  reservationId: string;
};

export type Showing = {
  movie: Movie;
  available: Availability[];
};

type RoomId = "room-a" | "room-b" | "room-c";
@Injectable()
export class ShowingStateService {
  // private showings$$ = new BehaviorSubject<Showing[] | null>(null);
  showings$ = new Observable<Showing[]>();
  isLoading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   // this.isLoading = true;
    //   if (!params['day']) {
    //     // return this.showDefaultPage();
    //     this.getShowings('06-12-2022');
    //     return;
    //   }
    //   const adjustedDate = params['day'].replaceAll('/', '-');
    //   // this.movie.fetchReperoire(adjustedDate);
    //   console.log(adjustedDate);
    //   this.getShowings(adjustedDate);
    // });
  }

  // get showings$(): Observable<Showing[] | null> {
  //   return this.showings$$.asObservable();
  // }

  // getShowings(date: string | number) {
  //   // this.http
  //   console.log('in service', date);
  //   //   .get<Showing[]>(`${API.SHOWINGS}?day=${date}`)
  //   //   .subscribe((showings) => {
  //   //     this.showings$$.next({ value: showings, isAvailable: true });
  //   //   });
  //   this.http.get<Showing[]>(`${API.SHOWINGS}?day=${date}`).pipe(
  //     tap({
  //       next: (showings) => {
  //         this.showings$$.next(showings);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     })
  //   );
  // }
  getShowings(date: string | number) {
    // this.http
    console.log("in service", date);
    //   .get<Showing[]>(`${API.SHOWINGS}?day=${date}`)
    //   .subscribe((showings) => {
    //     this.showings$$.next({ value: showings, isAvailable: true });
    //   });
    this.showings$ = this.http.get<Showing[]>(`${API.SHOWINGS}?day=${date}`);

    this.isLoading = false;
  }
}
