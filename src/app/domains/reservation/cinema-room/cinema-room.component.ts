import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { CinemaRoomStateService, Seat } from "./cinema-room.state.service";

@Component({
  selector: "app-cinema-room[seats]",
  templateUrl: "./cinema-room.component.html",
  styleUrls: ["./cinema-room.component.css"],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaRoomComponent {
  @Input() seats: Seat[][] = [];

  constructor(private cinemaRoom: CinemaRoomStateService) {}

  updateCinemaRoom(seat: Seat) {
    this.cinemaRoom.updateSeats(seat);
  }
}
