import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CinemaRoomStateService, Seat } from "..";
import { TicketStateService } from "../shared/ticket.state.service";

@Component({
  selector: "app-reservation-page",
  templateUrl: "./reservation-page.component.html",
  styleUrls: ["./reservation-page.component.css"],
})
export class ReservationPageComponent implements OnInit {
  params = "";
  constructor(
    private route: ActivatedRoute,
    private cinemaRoomService: CinemaRoomStateService,
    private ticketService: TicketStateService
  ) {}

  get cinemaRoomSeats$() {
    return this.cinemaRoomService.selectSeats$;
  }

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoomService.update(seat);
    this.ticketService.addToList(seat);
  }

  ngOnInit(): void {
    this.params = this.route.snapshot.params["id"];
    this.cinemaRoomService.getSeatingData(this.params);
  }
}
