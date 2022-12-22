import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';
import { Maybe } from '../../../user/authentication.service';
import { API } from '../../../../environments/constants';

export interface Reservation {
  id: string;
  cinemaRoomId: string;
  movieTitle: string;
  takenSeats: Seat[];
}
export type CinemaRoom = {
  id: string;
  seats: Seat[][];
};
export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: 'standard' | 'vip';
};
export type SeatBooked = {
  id: string;
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: 'standard' | 'vip';
};

@Injectable({
  providedIn: 'root',
})
export class CinemaRoomService {
  private cinemaRoom$$ = new BehaviorSubject<Maybe<CinemaRoom>>(null);
  private seatsBooked$$ = new BehaviorSubject<SeatBooked[]>([]);

  constructor(private http: HttpClient) {}

  get cinemaRoom$(): Observable<Maybe<CinemaRoom>> {
    return this.cinemaRoom$$.asObservable();
  }

  get seatsBooked$(): Observable<SeatBooked[]> {
    return this.seatsBooked$$.asObservable();
  }

  getSeatingData(id: string | number) {
    this.http
      .get<Reservation>(`${API.RESERVATIONS}/${id}`)
      .subscribe(({ cinemaRoomId, takenSeats }) => {
        this.http
          .get<CinemaRoom>(`${API.CINEMAROOMS}?id=${cinemaRoomId}`)
          .pipe(
            tap((cinemaRoom) => this.mapCinemaRoomSeats(cinemaRoom, takenSeats))
          )
          .subscribe((seatings) => {
            // to do: redirect to not found page when  seatings not found
            this.cinemaRoom$$.next(seatings);
          });
      });
  }

  updateSeats(seatToUpdate: Seat) {
    const seatToUpdateId =
      seatToUpdate.position.row + seatToUpdate.position.column;

    if (this.isExisting(seatToUpdateId)) {
      this.removeBookedSeat(seatToUpdateId);
    } else {
      this.addBookedSeat(seatToUpdate, seatToUpdateId);
    }
  }
  private isExisting(seatId: string) {
    return this.seatsBooked$$.value.some(({ id }) => id === seatId);
  }

  private removeBookedSeat(seatToRemoveId: string) {
    this.seatsBooked$$.next(
      this.seatsBooked$$.value.filter(({ id }) => id !== seatToRemoveId)
    );
  }

  private addBookedSeat(seat: Seat, id: string) {
    this.seatsBooked$$.next([
      ...new Set([...this.seatsBooked$$.value, { id: id, ...seat }]),
    ]);
  }

  private mapCinemaRoomSeats(cinemaRoom: CinemaRoom, seatsToUpdate?: Seat[]) {
    if (!seatsToUpdate) return cinemaRoom;
    const takenSeats = seatsToUpdate;
    let updatedCinemaRoom = cinemaRoom;

    cinemaRoom.seats.map((column) => {
      column.forEach((row, rowIndex, array) => {
        if (
          takenSeats.find(
            (seat) =>
              seat?.position?.column === row?.position?.column &&
              seat?.position?.row === row?.position?.row
          )
        ) {
          array[rowIndex] = takenSeats.find(
            (seat) =>
              seat.position?.column === row.position?.column &&
              seat.position?.row === row.position?.row
          ) as Seat;
        }
      });
    });

    return updatedCinemaRoom;
  }
}
