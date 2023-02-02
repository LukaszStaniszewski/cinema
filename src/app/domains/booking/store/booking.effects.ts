import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { combineLatest, exhaustMap, filter, map, of, tap } from "rxjs";

import { TicketStateService } from "../reservation/shared/ticket.state.service";
import { BookingActions } from "./booking.actions";
import { selectTickets } from "./booking.selectors";
import { AppStateWithBookingState } from "./booking.state";

@Injectable()
export class BookingEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private ticketService = inject(TicketStateService);

  createTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.add_seat),
      // exhaustMap((seat) => this.ticketService.mapSeatAndTicketType(seat))
      map(seat => this.ticketService.mapSeatAndTicketType(seat)),
      map(ticket => BookingActions.add_ticket(ticket))
      // tap(({}) => )
    );
  });
  // createTicket$2 = createEffect(() => {
  //   return this.actions$.pipe(

  //     exhaustMap((seat) => combineLatest([this.store.select(selectTickets), of(seat)])),
  //     map(([ticketsState, seat]) => this.ticketService.mapSeatAndTicketType(seat)),
  //     map(ticket => BookingActions.add_ticket(ticket))
  //     // tap(({}) => )
  //   );
  // });

  // removeTicket$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(BookingActions.remove_ticket),
  //          exhaustMap(({id}) => combineLatest([this.store.select(selectTickets), of(id)])),
  //          map(([tickets, id]) => tickets.filter(ticket => ticket.id === id)),
  //          map(tickets => BookingActions.remove_ticket(tickets))
  //   )
  // })

  // Gdy createEffect nie ma akcji do której mógłby przekierować, to wywołuje wkoło tą jedną akcję.
  // dispatch false zapobiega nieskończonej pętli,
  // createTicket$ = createEffect(() => {
  //   return this.actions$.pipe(ofType(bookingActions.add_seat));
  // }, {dispatch: false});
}
