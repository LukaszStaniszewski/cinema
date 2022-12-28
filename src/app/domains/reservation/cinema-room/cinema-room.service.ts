import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Maybe } from '../../user/authentication.service';
import { API } from '../../../../environments/constants';
import { TicketService, TicketState } from '../ticket-details/ticket.service';
import { Router } from '@angular/router';
import { ReservationModule } from '..';

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
  // providedIn: ReservationModule,
  providedIn: 'root',
})
export class CinemaRoomService implements OnDestroy {
  private cinemaRoom$$ = new BehaviorSubject<Maybe<CinemaRoom>>(null);
  private seatsBooked$$ = new BehaviorSubject<SeatBooked[]>([]);

  constructor(
    private http: HttpClient,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.seatsBooked$$.subscribe((seatsBooked) => {
      if (!this.cinemaRoom$$.value) return;
      this.cinemaRoom$$.next(
        this.mapCinemaRoomSeats(this.cinemaRoom$$.value, seatsBooked)
      );
    });
  }

  get cinemaRoom$(): Observable<Maybe<CinemaRoom>> {
    return this.cinemaRoom$$.asObservable();
  }

  get seatsBooked$(): Observable<SeatBooked[]> {
    return this.seatsBooked$$.asObservable();
  }

  getSeatingData(id: string | number) {
    this.http
      .get<Reservation>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        switchMap(({ cinemaRoomId, takenSeats }) => {
          return combineLatest([
            of(takenSeats),
            this.http.get<CinemaRoom>(`${API.CINEMAROOMS}?id=${cinemaRoomId}`),
          ]);
        })
      )
      .pipe(
        map(([takenSeats, cinemaRoom]) =>
          this.mapCinemaRoomSeats(cinemaRoom, takenSeats)
        )
      )
      .subscribe({
        next: (seatings) => {
          this.cinemaRoom$$.next(seatings);
        },
        error: (err) => this.router.navigate(['/404']),
      });
  }

  ngOnDestroy() {
    this.seatsBooked$$.unsubscribe();
    this.cinemaRoom$$.unsubscribe();
  }

  updateSeats(seatToUpdate: Seat) {
    const seatToUpdateId =
      seatToUpdate.position.row + seatToUpdate.position.column;

    if (this.isExisting(seatToUpdateId)) {
      this.removeBookedSeat(seatToUpdateId);
    } else {
      this.ticketService.tickets$.subscribe((ticketState) => {
        if (this.doesTicketsAndSeatsNumberMatch(ticketState)) {
          this.addBookedSeat(seatToUpdate, seatToUpdateId);
        }
      });
    }
  }

  private doesTicketsAndSeatsNumberMatch(ticketState: TicketState) {
    return (
      ticketState.tickets.reduce((acc, val) => val.pickedTickets + acc, 0) >
      this.seatsBooked$$.value.length
    );
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
      ...new Set([
        ...this.seatsBooked$$.value,
        { id: id, ...seat, reservation: true },
      ]),
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
        } else {
          array[rowIndex] = { ...array[rowIndex], reservation: false };
        }
      });
    });

    return updatedCinemaRoom;
  }
}
