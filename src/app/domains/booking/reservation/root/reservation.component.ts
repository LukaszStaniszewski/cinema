import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AppStateWithBookingState,
  BookingApiAtions,
  selectShowingPartial,
} from "@domains/booking/store";
import { ShowingApiService, ShowingPartial } from "@domains/dashboard";
import { Store } from "@ngrx/store";
import { Observable, single, switchMap, takeWhile, tap } from "rxjs";

import { CinemaRoomStateService, ReservationService, Seat, TicketStateService } from "..";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements OnInit {
  params = "";
  // showingInfo$ = new Observable<ShowingPartial>();
  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor(
    private route: ActivatedRoute,
    private cinemaRoom: CinemaRoomStateService,
    private ticket: TicketStateService,
    private showing: ShowingApiService,
    private reservationService: ReservationService
  ) {}

  get cinemaRoomSeats$() {
    return this.cinemaRoom.selectSeats$;
  }
  showingInfo$ = this.store.select(selectShowingPartial);

  ngOnInit(): void {
    this.params = this.route.snapshot.params["id"];
    this.reservationService.getReservationData(this.params);
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.update(seat);
    this.ticket.addToList(seat);
    this.ticket.detectChangesToUpdateDB(this.params);
  }
}
