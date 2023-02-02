import { Action, createActionGroup, props } from "@ngrx/store";

import { Seat, SeatBooked, Ticket, TicketDetails } from "./booking.state";

export const BookingActions = createActionGroup({
  source: "tickets",
  events: {
    add_seat: props<{ seat: Seat; id: string }>(),
    add_ticket: props<Ticket>(),
    remove_ticket: props<{ id: string }>(),
  },
});
