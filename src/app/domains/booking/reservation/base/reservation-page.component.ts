import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Maybe } from "@shared/utility-types";

import { CinemaRoomStateService, Seat } from "..";
import { TicketStateService } from "../shared/ticket.state.service";

type ReservationParams = {
  id: string;
};
@Component({
  selector: "app-reservation-page",
  templateUrl: "./reservation-page.component.html",
  styleUrls: ["./reservation-page.component.css"],
})
export class ReservationPageComponent {
  params: Maybe<ReservationParams>;
  hide = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: CinemaRoomStateService,
    private ticketService: TicketStateService
  ) {}

  get cinemaRoom$() {
    return this.movieService.selectCinemaRoom$;
  }
  // change to addTicket ?
  updateCinemaRoom(seat: Seat) {
    this.movieService.update(seat);
    this.ticketService.updateList(seat);
  }

  toggleTicketDetails(isValid: boolean) {
    if (!isValid) return;
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.params = params as ReservationParams;
      this.movieService.getSeatingData(this.params.id);
    });
  }
}
