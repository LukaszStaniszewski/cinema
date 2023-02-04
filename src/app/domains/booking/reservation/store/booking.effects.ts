import { inject, Injectable } from "@angular/core";
import { MESSAGE, SET_UP } from "@environments/constants";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { catchError, EMPTY, map } from "rxjs";

import { TicketStateService } from "../shared/ticket.state.service";
import { BookingActions } from "./booking.actions";
import { selectTickets } from "./booking.selectors";
import { AppStateWithBookingState } from "./booking.state";

@Injectable()
export class BookingEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private ticketService = inject(TicketStateService);
  private toastService = inject(ToastStateService);

  createTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.addTicketStart),
      concatLatestFrom(() => this.store.select(selectTickets)),
      map(([seat, tickets]) => {
        if (tickets.length + 1 <= SET_UP.TICKET_LIMIT) {
          return this.ticketService.mapSeatAndTicketType(seat);
        } else throw new Error(MESSAGE.TICKET_LIMIT);
      }),
      map(ticket => BookingActions.addTicketSuccess(ticket)),
      catchError((error: string) => {
        this.toastService.activateToast({ message: error, status: "info" });
        return EMPTY;
      })
    );
  });
}
