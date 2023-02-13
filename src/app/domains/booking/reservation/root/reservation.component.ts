import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ShowingApiService, ShowingPartial } from "@domains/dashboard";
import { Observable } from "rxjs";

import { CinemaRoomStateService, Seat, TicketStateService } from "..";
import { ReservationService } from "../reservation.service";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements OnInit {
  params = "";
  showingInfo$ = new Observable<ShowingPartial>();
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

  ngOnInit(): void {
    this.params = this.route.snapshot.params["id"];
    // this.cinemaRoom.getSeatingData(this.params);
    this.reservationService.getReservationData(this.params);
    this.showingInfo$ = this.showing.getShowingPartial(this.params);
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.update(seat);
    this.ticket.addToList(seat);
  }
}
