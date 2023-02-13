import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { combineLatest, map, of, switchMap } from "rxjs";

import { AppStateWithBookingState, BookingApiAtions, Ticket } from "../store";
import { CinemaRoomStateService } from "./cinema-room/cinema-room.state.service";
import { TicketStateService } from "./ticket.state.service";

export type Order = {
  tickets: Ticket[];
};
export interface Seat {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
}
export interface ReservationDto {
  id: string;
  cinemaRoomId: string;
  takenSeats: Seat[];
  order?: Order;
}

@Injectable()
export class ReservationService {
  private http = inject(HttpClient);

  private store = inject<Store<AppStateWithBookingState>>(Store);
  private cinemaRoomService = inject(CinemaRoomStateService);
  private ticketService = inject(TicketStateService);
  private toastService = inject(ToastStateService);

  getReservationData(id: string) {
    this.store.dispatch(BookingApiAtions.getTicketsStart());
    this.ticketService.detectChangesToUpdateDB(id);
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
      .pipe(map(([{ takenSeats, order }, cinemaRoom]) => ({ takenSeats, order, cinemaRoom })))
      .subscribe({
        next: ({ takenSeats, order, cinemaRoom }) => {
          if (order) {
            this.store.dispatch(BookingApiAtions.getTicketsSuccess({ payload: order?.tickets }));
          }
          this.cinemaRoomService.mapSeats(cinemaRoom, takenSeats, order?.tickets);
        },
        error: () =>
          this.toastService.activateToast({
            message: MESSAGE.CINEMA_ROOM_NOT_FOUND,
            status: "error",
          }),
      });
  }
}
