import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API, SET_UP } from "@environments/constants";
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, takeUntil } from "rxjs";

export interface ReservationDTO {
  id: string;
  cinemaRoomId: string;
  movieTitle: string;
  takenSeats: Seat[];
}

export interface Seat {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
}

export type CinemaRoom = {
  id: string;
  seats: Seat[][];
};

const defaultCinemaRoomState = {
  id: "",
  seats: [],
};

@Injectable()
export class CinemaRoomStateService {
  private cinemaRoomState$$ = new BehaviorSubject<CinemaRoom>(defaultCinemaRoomState);

  private http = inject(HttpClient);

  get cinemaRoomState$(): Observable<CinemaRoom> {
    return this.cinemaRoomState$$.asObservable();
  }

  get selectSeats$(): Observable<Seat[][]> {
    return this.cinemaRoomState$.pipe(map(state => state.seats));
  }

  private patchState(stateSlice: Partial<CinemaRoom>) {
    this.cinemaRoomState$$.next({
      ...this.cinemaRoomState$$.value,
      ...stateSlice,
    });
  }
  getSeatingData(id: string) {
    this.http
      .get<ReservationDTO>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        takeUntil(this.cinemaRoomState$$.value.seats),
        switchMap(({ cinemaRoomId, takenSeats }) => {
          return combineLatest([
            of(takenSeats),
            this.http.get<CinemaRoom>(`${API.CINEMAROOMS}/${cinemaRoomId}`),
          ]);
        })
      )
      .pipe(map(([takenSeats, cinemaRoom]) => this.mapCinemaRoomSeats(cinemaRoom, takenSeats)))
      .subscribe({
        next: seatings => {
          this.patchState({
            ...seatings,
          });
        },
        error: error => console.error(error),
      });
  }

  reset() {
    this.patchState(defaultCinemaRoomState);
  }

  update(seatToUpdate: Seat) {
    let bookedSeats = 0;
    const cinemaRoom = this.cinemaRoomState$$.value;
    if (!cinemaRoom) return;
    const updatedCinemaRoom = cinemaRoom.seats.map(column => {
      return column.map(seat => {
        if (seat.reservation === true) bookedSeats++;

        if (
          seat?.position?.column === seatToUpdate?.position?.column &&
          seat?.position?.row === seatToUpdate?.position?.row
        ) {
          return { ...seat, reservation: !seat.reservation };
        }
        return seat;
      });
    });
    if (bookedSeats >= SET_UP.TICKET_LIMIT) return;

    this.patchState({ id: cinemaRoom.id, seats: updatedCinemaRoom });
  }

  private mapCinemaRoomSeats(cinemaRoom: CinemaRoom, seatsToUpdate?: Seat[]) {
    if (!seatsToUpdate) return cinemaRoom;
    const takenSeats = seatsToUpdate;
    const updatedCinemaRoom = cinemaRoom;

    cinemaRoom.seats.map(column => {
      column.forEach((row, rowIndex, array) => {
        if (
          takenSeats.find(
            seat =>
              seat?.position?.column === row?.position?.column &&
              seat?.position?.row === row?.position?.row
          )
        ) {
          array[rowIndex] = takenSeats.find(
            seat =>
              seat.position?.column === row.position?.column &&
              seat.position?.row === row.position?.row
          ) as Seat;
        } else {
          array[rowIndex] = { ...array[rowIndex], reservation: false };
        }
      });
    });

    return updatedCinemaRoom;
  }

  ngOnDestory() {
    console.log("cinema room service destroeyd");
  }
}
