import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnDestroy } from "@angular/core";
import { AppState } from "@domains/booking/booking.module";
import { bookingActions } from "@domains/booking/store/booking.actions";
import { AppStateWithBookingState } from "@domains/booking/store/booking.state";
import { API, MESSAGE, SET_UP } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from "rxjs";

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

@Injectable()
export class CinemaRoomStateService {
  private cinemaRoomState$$ = new BehaviorSubject<CinemaRoomState>({
    cinemaRoom: null,
    seatsBooked: [],
  });
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private http = inject(HttpClient);
  private toastService = inject(ToastStateService);

  get cinemaRoomState$(): Observable<CinemaRoomState> {
    return this.cinemaRoomState$$.asObservable();
  }

  get selectCinemaRoom$(): Observable<CinemaRoom | null> {
    return this.cinemaRoomState$.pipe(map(state => state.cinemaRoom));
  }

  get selectSeatsBooked$(): Observable<SeatBooked[]> {
    return this.cinemaRoomState$.pipe(map(state => state.seatsBooked));
  }

  get seatsBooked(): SeatBooked[] {
    return this.cinemaRoomState$$.value.seatsBooked;
  }

  private patchState(stateSlice: Partial<CinemaRoomState>) {
    this.cinemaRoomState$$.next({
      ...this.cinemaRoomState$$.value,
      ...stateSlice,
    });
  }
  getSeatingData(id: string) {
    this.http
      .get<ReservationApi>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        switchMap(({ cinemaRoomId, takenSeats }) => {
          return combineLatest([
            of(takenSeats),
            this.http.get<CinemaRoom>(`${API.CINEMAROOMS}/${cinemaRoomId}`),
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
        error: error => console.error(error),
      });
  }

  updateSeats(seatToUpdate: Seat) {
    const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;

    if (this.isExisting(seatToUpdateId)) {
      this.removeBookedSeat(seatToUpdateId);
    } else if (
      this.cinemaRoomState$$.value.seatsBooked.length + 1 <=
      SET_UP.TICKET_LIMIT
    ) {
      this.store.dispatch(bookingActions.add_seat(seatToUpdate));
      // this should be method that creates ticket
      this.addBookedSeat(seatToUpdate, seatToUpdateId);
    } else {
      this.toastService.updateToast({ message: MESSAGE.TICKET_LIMIT, status: "info" });
    }

    this.updateCinemaRoom();
  }
  private isExisting(seatId: string) {
    return this.cinemaRoomState$$.value.seatsBooked.some(({ id }) => id === seatId);
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
    const cinemaRoom = this.cinemaRoomState$$.value.cinemaRoom;
    if (!cinemaRoom) return;
    const updatedCinemaRoom = this.mapCinemaRoomSeats(cinemaRoom, this.seatsBooked);
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
}
