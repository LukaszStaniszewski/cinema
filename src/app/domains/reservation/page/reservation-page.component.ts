import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Maybe } from "@shared/utility-types";

import { CinemaRoomStateService } from "..";

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
    private movieService: CinemaRoomStateService
  ) {}

  get cinemaRoom$() {
    return this.movieService.selectCinemaRoom$;
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
