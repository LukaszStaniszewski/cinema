import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, tap } from "rxjs";

import { TicketStateService } from "../reservation/shared/ticket.state.service";
import { bookingActions } from "./booking.actions";

@Injectable()
export class BookingEffects {
  private actions$ = inject(Actions);
  private ticketService = inject(TicketStateService);

  createTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookingActions.add_seat),
      // exhaustMap((seat) => this.ticketService.mapSeatAndTicketType(seat))
      map(seat => this.ticketService.mapSeatAndTicketType(seat)),
      map(ticket => bookingActions.add_ticket(ticket))
      // tap(({}) => )
    );
  });

  // Gdy createEffect nie ma akcji do której mógłby przekierować, to wywołuje wkoło tą jedną akcję.
  // dispatch false zapobiega nieskończonej pętli,
  // createTicket$ = createEffect(() => {
  //   return this.actions$.pipe(ofType(bookingActions.add_seat));
  // }, {dispatch: false});
}
