import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShowingPartial } from "@domains/dashboard";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { Maybe } from "@shared/utility-types";
import {
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  takeUntil,
  takeWhile,
} from "rxjs";

import { CinemaRoomStateService } from "./reservation/cinema-room/cinema-room.state.service";
import { TicketStateService } from "./reservation/ticket.state.service";
import {
  BookingApiAtions,
  BookingTicketActions,
  selectShowingPartial,
  selectTicketsAtPosition,
  Ticket,
} from "./store";

type Order = {
  tickets: Ticket[];
  showing: Maybe<ShowingPartial>;
  credentials?: {
    name: string;
    surname: string;
    email: string;
    phoneNumber: number;
    reservationId: string;
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
export class InitialBookingApiService {
  hasLoadedShowingPartial = this.store.select(selectShowingPartial);
  hasLoaded = this.store.select(selectTicketsAtPosition(0));

  constructor(
    private cinemaRoomService: CinemaRoomStateService,
    private ticketService: TicketStateService,
    private location: Location,
    private store: Store,
    private http: HttpClient,
    private toastService: ToastStateService
  ) {
    const regex = new RegExp(/booking/i);
    this.location.onUrlChange(url => {
      if (regex.test(url)) {
        this.getShowingPartial(url);
      }
      if (!regex.test(url)) {
        this.resetStateOnLeaveCuzNgOnDestoryIsNotWorking();
      }
    });
  }
  getReservationData(id: string) {
    this.store.dispatch(BookingApiAtions.getTicketsStart());

    this.http
      .get<ReservationDto>(`${API.RESERVATIONS}/${id}`)
      .pipe(
        takeUntil(this.hasLoaded.pipe(takeWhile(tickets => !!tickets))),
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
          // this.hasLoaded = true;
        },
        error: () =>
          this.toastService.activateToast({
            message: MESSAGE.CINEMA_ROOM_NOT_FOUND,
            status: "error",
          }),
      });
  }

  private resetStateOnLeaveCuzNgOnDestoryIsNotWorking() {
    this.cinemaRoomService.reset();
    this.ticketService.reset();
    this.store.dispatch(BookingTicketActions.resetState());
  }

  private getShowingPartial(reservationId: string) {
    of(reservationId)
      .pipe(
        takeUntil(this.hasLoadedShowingPartial.pipe(takeWhile(showing => !!showing))),
        map(url => url.split("/")),
        map(url => url[url.length - 1]),
        distinctUntilChanged()
      )
      .subscribe(params => {
        this.store.dispatch(BookingApiAtions.getShowingPartialStart({ payload: params }));
      });
  }
}
