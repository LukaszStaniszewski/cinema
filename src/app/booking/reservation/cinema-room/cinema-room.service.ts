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
  [key: string]: {
    position: { column: string; row: string };
    reservation: boolean;
    taken: boolean;
    status: 'standard' | 'vip';
  };
};

@Injectable({
  providedIn: 'root',
})
//@ts-ignore
export class CinemaRoomService {
  private cinemaRoom$$ = new BehaviorSubject<Maybe<CinemaRoom>>(null);
  private seatsBooked$$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  get cinemaRoom$(): Observable<Maybe<CinemaRoom>> {
    return this.cinemaRoom$$.asObservable();
  }

  get seatsBooked$(): Observable<string[]> {
    return this.seatsBooked$$.asObservable();
  }

  // get seatsBookedValue(): Seat[] {
  //   return this.seatsBooked$$.value;
  // }

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

  mapSeatBooked(seat: Seat) {
    const id = seat.position.row + seat.position.column;
    this.addSeat(seat, id);

    // if (this.seatsBooked$$.value[id].reservation === false) {
    //   this.removeSeat(id);
    // }
  }
  addSeat(seat: Seat, id: string) {
    // this.seatsBooked$$.next([...this.seatsBooked$$.value, id]);
    if (this.seatsBooked$$.value.includes(id)) {
      this.seatsBooked$$.next(
        this.seatsBooked$$.value.filter((value) => value !== id)
      );
      return;
    }
    this.seatsBooked$$.next([...new Set([...this.seatsBooked$$.value, id])]);
  }
  // addSeat(seat: Seat, id: string) {
  //   this.seatsBooked$$.next({
  //     ...this.seatsBooked$$.value,
  //     [id]: { ...seat, reservation: !seat.reservation },
  //   });
  // }

  // removeSeat(id: string) {
  //   this.seatsBooked$$.pipe(
  //     tap((seatsBooked) => {
  //       return {...seatsBooked, seatsBooked[id]: null};
  //     })
  //   );
  // }

  updateSeats(seatToUpdate: Seat) {
    const adjustedSeat = [
      { ...seatToUpdate, reservation: !seatToUpdate.reservation },
    ];

    this.mapSeatBooked(seatToUpdate);
    // this.seatsBooked$$.next([...this.seatsBooked$$.value, ...adjustedSeat]);
    const cinemaRoom = this.cinemaRoom$$.value;
    if (!cinemaRoom) return;
    const updatedCinemaRoom = this.mapCinemaRoomSeats(cinemaRoom, adjustedSeat);
    this.cinemaRoom$$.next(updatedCinemaRoom);
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
