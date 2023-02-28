/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Ticket } from "@domains/booking/store";
import { API, SET_UP } from "@environments/constants";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface ReservationDto {
  id: string;
  cinemaRoomId: string;
  takenSeats: Seat[];
  order?: Order;
}

export type Order = {
  tickets: Ticket[];
};
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

  get cinemaRoomId() {
    return this.cinemaRoomState$$.value.id;
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

  fetchCinemaRoom(cinemaRoomId: string) {
    return this.http.get<CinemaRoom>(`${API.CINEMAROOM}/${cinemaRoomId}`);
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

  mapSeats(cinemaRoom: CinemaRoom, taken?: Seat[], reservedByCurrentUser?: Ticket[]) {
    // if (!taken) return cinemaRoom;
    if (!taken) return this.patchState({ ...cinemaRoom });

    const takenSeats = taken;
    const updatedCinemaRoom = cinemaRoom;
    const ticketsReservedInCurrentSession = reservedByCurrentUser;

    cinemaRoom.seats.map(column => {
      column.forEach((row, rowIndex, array) => {
        if (
          takenSeats.find(
            takenSeat =>
              takenSeat?.position?.column === row?.position?.column &&
              takenSeat?.position?.row === row?.position?.row
          )
        ) {
          array[rowIndex] = takenSeats.find(
            seat => seat.position?.column === row.position?.column && seat.position?.row === row.position?.row
          ) as Seat;
        } else if (
          ticketsReservedInCurrentSession?.find(
            ({ seat }) =>
              seat.position?.column == row.position?.column && seat.position?.row == row.position?.row
          )
        ) {
          array[rowIndex] = ticketsReservedInCurrentSession?.find(
            ({ seat }) =>
              seat.position?.column == row.position?.column && seat.position?.row == row.position?.row
          )?.seat as Seat;
        } else {
          array[rowIndex] = { ...array[rowIndex], reservation: false };
        }
      });
    });

    // return updatedCinemaRoom;

    this.patchState({ ...updatedCinemaRoom });
  }

  // private mapTakenSeats(array: Seat[], rowIndex: number, takenSeats: Seat[]) {
  //   array[rowIndex] = takenSeats.find(
  //     seat =>
  //       seat.position?.column === row.position?.column &&
  //       seat.position?.row === row.position?.row
  //   ) as Seat;
  // }
  ngOnDestory() {
    console.log("cinema room service destroeyd");
  }
}
