import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppStateWithBookingState, selectShowingPartial } from "@domains/booking/store";
import { Store } from "@ngrx/store";

import { CinemaRoomStateService, Seat, TicketStateService } from "..";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements OnInit {
  params = "";

  private store = inject<Store<AppStateWithBookingState>>(Store);

  constructor(
    private route: ActivatedRoute,
    private cinemaRoom: CinemaRoomStateService,
    private ticket: TicketStateService
  ) {}

  get cinemaRoomSeats$() {
    return this.cinemaRoom.selectSeats$;
  }
  showingInfo$ = this.store.select(selectShowingPartial);

  ngOnInit(): void {
    this.params = this.route.snapshot.params["id"];
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.update(seat);
    this.ticket.addToList(seat);
    this.ticket.detectChangesToUpdateDB(this.params);
  }
}
