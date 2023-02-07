import { inject, Injectable } from "@angular/core";
import { MESSAGE, SET_UP } from "@environments/constants";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { catchError, map, mergeMap, throwError } from "rxjs";

import { TicketStateService } from "../reservation";
import {
  AppStateWithBookingState,
  BookingActions,
  selectTickets,
  selectTicketsSortedByType,
} from ".";

@Injectable()
export class BookingEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private ticketService = inject(TicketStateService);
  private toastService = inject(ToastStateService);

  // test = this.actions$.subscribe(console.log);
  createTicket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.addTicketStart),
      concatLatestFrom(() => this.store.select(selectTickets)),
      map(([seat, tickets]) => {
        if (tickets.length + 1 <= SET_UP.TICKET_LIMIT) {
          return this.ticketService.mapSeatAndTicketType(seat);
        } else throw new Error(MESSAGE.TICKET_LIMIT);
      }),

      mergeMap(ticket => [
        BookingActions.addTicketSuccess({ payload: ticket }),
        BookingActions.addTicketSortedByType({
          payload: { amount: 1, price: ticket.price, type: ticket.type },
        }),
      ]),
      // map(ticket => BookingActions.addTicketSuccess(ticket)),
      catchError((error: string) => {
        this.toastService.activateToast({ message: error, status: "info" });
        return throwError(() => new Error(error));
      })
    );
  });

  updateTicketsSortedByType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.updateTicketsSortedByTypeStart),
      concatLatestFrom(() => this.store.select(selectTicketsSortedByType)),
      map(
        ([
          {
            payload: { currentType, ...ticketToUpdate },
          },
          ticketsSortedByType,
        ]) => {
          return ticketsSortedByType.map(sortedTicket => {
            if (sortedTicket.type === ticketToUpdate.type) {
              return {
                ...ticketToUpdate,
                amount: sortedTicket.amount + 1,
                price: sortedTicket.price + ticketToUpdate.price,
              };
            } else if (sortedTicket.type === currentType) {
              return {
                ...sortedTicket,
                amount: Math.max(sortedTicket.amount - 1, 0),
                price: Math.max(sortedTicket.price - ticketToUpdate.price, 0),
              };
            }
            return sortedTicket;
          });
        }
      ),
      map(ticketsSortedByType =>
        BookingActions.updateTicketsSortedByTypeSuccess({ payload: ticketsSortedByType })
      )
    );
  });
}
