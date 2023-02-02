import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};
@Component({
  selector: "app-cinema-room[seats]",
  templateUrl: "./cinema-room.component.html",
  styleUrls: ["./cinema-room.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaRoomComponent {
  @Input() seats: Seat[][] = [];
  @Output() newSelectedSeat = new EventEmitter();

  selectSeat(seat: Seat, test?: any) {
    console.log(test);
    this.newSelectedSeat.emit(seat);
  }
}
