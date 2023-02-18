import { inject, Injectable } from "@angular/core";
import { ShowingApiService } from "@domains/dashboard";
import { MESSAGE, SET_UP } from "@environments/constants";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { catchError, map, of, switchMap, takeWhile, throwError } from "rxjs";

import { TicketStateService } from "../reservation";
import {
  AppStateWithBookingState,
  BookingApiAtions,
  BookingTicketActions,
  selectShowingPartial,
  selectTickets,
} from ".";

@Injectable()
export class BookingEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private ticketService = inject(TicketStateService);
  private toastService = inject(ToastStateService);
  private showingService = inject(ShowingApiService);

  constructor() {
    this.actions$.subscribe(console.log);
  }

  createTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingTicketActions.addTicketStart),
      concatLatestFrom(() => this.store.select(selectTickets)),
      map(([seat, tickets]) => {
        if (tickets.length + 1 <= SET_UP.TICKET_LIMIT) {
          return this.ticketService.mapSeatAndTicketType(seat);
        } else throw new Error(MESSAGE.TICKET_LIMIT);
      }),
      map(ticket => BookingTicketActions.addTicketSuccess({ payload: ticket })),
      catchError((error: string) => {
        this.toastService.activateToast({ message: error, status: "info" });
        return throwError(() => new Error(error));
      })
    );
  });

  getShowingPartial$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingApiAtions.getShowingPartialStart),
      concatLatestFrom(() => this.store.select(selectShowingPartial)),
      takeWhile(([payload, showingParital]) => !showingParital),
      switchMap(([{ payload }]) => this.showingService.getShowingPartial(payload)),
      map(showingPartial => BookingApiAtions.getShowingPartialSuccess(showingPartial)),
      catchError(error => of(BookingApiAtions.getShowingPartialFailure({ payload: error })))
    );
  });
}
