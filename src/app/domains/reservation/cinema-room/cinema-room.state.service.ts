import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from "rxjs";

import { API } from "../../../../environments/constants";
import { TicketState } from "..";

export interface ReservationApi {
  id: string;
  cinemaRoomId: string;
  movieTitle: string;
  takenSeats: Seat[];
}

export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type CinemaRoom = {
  id: string;
  seats: Seat[][];
};

export type SeatBooked = {
  id: string;
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type CinemaRoomState = {
  cinemaRoom: CinemaRoom | null;
  seatsBooked: SeatBooked[];
};

@Injectable({
  // providedIn: ReservationModule,
  providedIn: "root",
})
export class CinemaRoomStateService implements OnDestroy {
  private cinemaRoomState$$ = new BehaviorSubject<CinemaRoomState>({
    cinemaRoom: null,
    seatsBooked: [],
  });

  constructor(
    private http: HttpClient,

    private router: Router
  ) {}

  get cinemaRoomState$(): Observable<CinemaRoomState> {
    return this.cinemaRoomState$$.asObservable();
  }

  get selectCinemaRoom$(): Observable<CinemaRoom | null> {
    return this.cinemaRoomState$.pipe(map(state => state.cinemaRoom));
  }

  get selectSeatsBooked$(): Observable<SeatBooked[]> {
    return this.cinemaRoomState$.pipe(map(state => state.seatsBooked));
  }

  get cinemaRoom(): CinemaRoom {
    return this.cinemaRoomState$$.value.cinemaRoom!;
  }

  get seatsBooked(): SeatBooked[] {
    return this.cinemaRoomState$$.value.seatsBooked!;
  }

  private patchState(stateSlice: Partial<CinemaRoomState>) {
    this.cinemaRoomState$$.next({
      ...this.cinemaRoomState$$.value,
      ...stateSlice,
    });
  }
  getSeatingData(id: string | number) {
    this.http
      .get<ReservationApi>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        switchMap(({ cinemaRoomId, takenSeats }) => {
          return combineLatest([
            of(takenSeats),
            this.http.get<CinemaRoom>(`${API.CINEMAROOMS}?id=${cinemaRoomId}`),
          ]);
        })
      )
      .pipe(
        map(([takenSeats, cinemaRoom]) => this.mapCinemaRoomSeats(cinemaRoom, takenSeats))
      )
      .subscribe({
        next: seatings => {
          this.patchState({
            cinemaRoom: seatings,
          });
        },
        error: err => this.router.navigate(["/404"]),
      });
  }

  updateSeats(seatToUpdate: Seat) {
    const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;

    if (this.isExisting(seatToUpdateId)) {
      this.removeBookedSeat(seatToUpdateId);
    } else {
      if (this.cinemaRoomState$$.value.seatsBooked.length + 1 <= 10) {
        this.addBookedSeat(seatToUpdate, seatToUpdateId);
      }
    }

    this.updateCinemaRoom();
  }
  private isExisting(seatId: string) {
    return this.cinemaRoomState$$.value.seatsBooked.some(({ id }) => id === seatId);
  }

  private doesTicketsAndSeatsNumberMatch(ticketState: TicketState) {
    return (
      ticketState.tickets.reduce((acc, val) => val.pickedTickets + acc, 0) >
      this.cinemaRoomState$$.value.seatsBooked.length
    );
  }

  private removeBookedSeat(seatToRemoveId: string) {
    const withoutUnwantedSeats = this.cinemaRoomState$$.value.seatsBooked.filter(
      ({ id }) => id !== seatToRemoveId
    );

    this.patchState({ seatsBooked: withoutUnwantedSeats });
  }

  private addBookedSeat(seat: Seat, id: string) {
    const withNewUniqueSeat = [
      ...new Set([
        ...this.cinemaRoomState$$.value.seatsBooked,
        { ...seat, id, reservation: true },
      ]),
    ];

    this.patchState({ seatsBooked: withNewUniqueSeat });
  }

  private updateCinemaRoom() {
    const updatedCinemaRoom = this.mapCinemaRoomSeats(this.cinemaRoom, this.seatsBooked);
    this.patchState({ cinemaRoom: updatedCinemaRoom });
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
  ngOnDestroy() {
    this.cinemaRoomState$$.unsubscribe();
  }
}
