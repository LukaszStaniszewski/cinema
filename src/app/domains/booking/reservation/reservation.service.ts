import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ShowingPartial } from "@domains/dashboard";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { Maybe } from "@shared/utility-types";
import { combineLatest, map, of, switchMap } from "rxjs";

import { AppStateWithBookingState, BookingApiAtions, Ticket } from "../store";
import { CinemaRoomStateService } from "./cinema-room/cinema-room.state.service";

type Order = {
  tickets: Ticket[];
  showing: Maybe<ShowingPartial>;
  credentials?: {
    name: string;
    surname: string;
    email: string;
    phoneNumber?: number;
  };
};
interface Seat {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
}
interface ReservationDto {
  id: string;
  cinemaRoomId: string;
  takenSeats: Seat[];
  reservedTickets?: Ticket[];
}

@Injectable()
export class ReservationService {
  private http = inject(HttpClient);

  private store = inject<Store<AppStateWithBookingState>>(Store);
  private cinemaRoomService = inject(CinemaRoomStateService);
  private toastService = inject(ToastStateService);

  getReservationData(id: string) {
    this.store.dispatch(BookingApiAtions.getTicketsStart());

    this.http
      .get<ReservationDto>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        switchMap(({ cinemaRoomId, ...reservation }) => {
          return combineLatest([
            of(reservation),
            this.cinemaRoomService.fetchCinemaRoom(cinemaRoomId),
          ]);
        })
      )
      .pipe(
        map(([{ takenSeats, reservedTickets }, cinemaRoom]) => ({
          takenSeats,
          reservedTickets,
          cinemaRoom,
        }))
      )
      .subscribe({
        next: ({ takenSeats, reservedTickets, cinemaRoom }) => {
          if (reservedTickets) {
            this.store.dispatch(BookingApiAtions.getTicketsSuccess({ payload: reservedTickets }));
          }
          this.cinemaRoomService.mapSeats(cinemaRoom, takenSeats, reservedTickets);
        },
        error: () =>
          this.toastService.activateToast({
            message: MESSAGE.CINEMA_ROOM_NOT_FOUND,
            status: "error",
          }),
      });
  }
}
