import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnDestroy } from "@angular/core";
import BookingModule from "@domains/booking/booking.module";
import { BookingActions } from "@domains/booking/reservation/store/booking.actions";
import { selectTickets } from "@domains/booking/reservation/store/booking.selectors";
import { AppStateWithBookingState } from "@domains/booking/reservation/store/booking.state";
import { API, MESSAGE, SET_UP } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from "rxjs";

import ReservationModule from "../reservation.module";

export interface ReservationApi {
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

export interface SeatBooked extends Seat {
  id: string;
}

export type CinemaRoomState = {
  cinemaRoom: CinemaRoom;
};

@Injectable({
  providedIn: BookingModule,
})
export class CinemaRoomStateService {
  private cinemaRoomState$$ = new BehaviorSubject<CinemaRoomState>({
    cinemaRoom: { id: "", seats: [] },
  });
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private http = inject(HttpClient);
  private toastService = inject(ToastStateService);
  constructor() {
    console.log(this.store.select(store => store.booking));
  }
  get cinemaRoomState$(): Observable<CinemaRoomState> {
    return this.cinemaRoomState$$.asObservable();
  }

  get selectSeats$(): Observable<Seat[][]> {
    return this.cinemaRoomState$.pipe(map(state => state.cinemaRoom.seats));
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
      .pipe(map(([takenSeats, cinemaRoom]) => this.mapCinemaRoomSeats(cinemaRoom, takenSeats)))
      .subscribe({
        next: seatings => {
          this.patchState({
            cinemaRoom: seatings,
          });
        },
        error: error => console.error(error),
      });
  }

  // updateSeats(seatToUpdate: Seat) {
  //   const seatToUpdateId = seatToUpdate.position.row + seatToUpdate.position.column;

  //   if (seatToUpdate.reservation === true) {
  //     this.store.dispatch(BookingActions.remove_ticket({ id: seatToUpdateId }));
  //   } else if (this.cinemaRoomState$$.value.seatsBooked.length + 1 <= SET_UP.TICKET_LIMIT) {
  //     this.store.dispatch(BookingActions.add_seat({ seat: seatToUpdate, id: seatToUpdateId }));
  //   } else {
  //     this.toastService.updateToast({ message: MESSAGE.TICKET_LIMIT, status: "info" });
  //   }

  //   this.updateCinemaRoom(seatToUpdate);
  // }
  private isExisting(seatId: string) {
    // return this.cinemaRoomState$$.value.seatsBooked.some((ticket) => tickes.);
    return this.store.select(selectTickets).subscribe(tickets => tickets.length);
  }

  // private removeBookedSeat(seatToRemoveId: string) {
  //   const withoutUnwantedSeats = this.cinemaRoomState$$.value.seatsBooked.filter(
  //     ({ id }) => id !== seatToRemoveId
  //   );

  //   this.patchState({ seatsBooked: withoutUnwantedSeats });
  // }

  // private addBookedSeat(seat: Seat, id: string) {
  //   const withNewUniqueSeat = [
  //     ...new Set([...this.cinemaRoomState$$.value.seatsBooked, { ...seat, id, reservation: true }]),
  //   ];

  //   this.patchState({ seatsBooked: withNewUniqueSeat });
  // }

  update(seatToUpdate: Seat) {
    let bookedSeats = 0;
    const cinemaRoom = this.cinemaRoomState$$.value.cinemaRoom;
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

    this.patchState({ cinemaRoom: { id: cinemaRoom.id, seats: updatedCinemaRoom } });
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
  // private mapCinemaRoomSeats(cinemaRoom: CinemaRoom, seatsToUpdate?: Seat[]) {
  //   if (!seatsToUpdate) return cinemaRoom;
  //   const takenSeats = seatsToUpdate;
  //   const updatedCinemaRoom = cinemaRoom;

  //   cinemaRoom.seats.map(column => {
  //     column.forEach((row, rowIndex, array) => {
  //       if (
  //         takenSeats.find(
  //           seat =>
  //             seat?.position?.column === row?.position?.column &&
  //             seat?.position?.row === row?.position?.row
  //         )
  //       ) {
  //         array[rowIndex] = takenSeats.find(
  //           seat =>
  //             seat.position?.column === row.position?.column &&
  //             seat.position?.row === row.position?.row
  //         ) as Seat;
  //       } else {
  //         array[rowIndex] = { ...array[rowIndex], reservation: false };
  //       }
  //     });
  //   });

  //   return updatedCinemaRoom;
  // }
}
