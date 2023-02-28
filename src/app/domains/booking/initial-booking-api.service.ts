import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API, MESSAGE } from "@environments/constants";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import {
  bindCallback,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  Subject,
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
  ) {}
  load() {
    this.location.onUrlChange(url => {
      const splitedUrl = url.split("/");
      const reservationId = splitedUrl[splitedUrl.length - 1];

      if (splitedUrl.includes("booking") && !splitedUrl.includes("summary")) {
        this.getShowingPartial(url);
        this.getReservationData(reservationId);
        this.store.dispatch(BookingTicketActions.getLatestReservationUrl({ payload: url }));
      }
      if (!splitedUrl.includes("booking") && !splitedUrl.includes("summary")) {
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
          return combineLatest([of(reservation), this.cinemaRoomService.fetchCinemaRoom(cinemaRoomId)]);
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
        error: error => console.log("error", error),
        // this.toastService.activateToast({
        //   message: MESSAGE.CINEMA_ROOM_NOT_FOUND,
        //   status: "error",
        // }),
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

  ngOnDestory() {
    console.log("ng destory");
  }
}
