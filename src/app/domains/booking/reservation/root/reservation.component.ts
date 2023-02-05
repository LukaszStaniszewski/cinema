import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CinemaRoomStateService, Seat, TicketStateService } from "..";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationComponent implements OnInit {
  params = "";
  constructor(
    private route: ActivatedRoute,
    private cinemaRoom: CinemaRoomStateService,
    private ticket: TicketStateService
  ) {}

  get cinemaRoomSeats$() {
    return this.cinemaRoom.selectSeats$;
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.update(seat);
    this.ticket.addToList(seat);
  }

  ngOnInit(): void {
    this.params = this.route.snapshot.params["id"];
    this.cinemaRoom.getSeatingData(this.params);
  }
}
