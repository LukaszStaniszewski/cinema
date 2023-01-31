import { Action, createActionGroup, props } from "@ngrx/store";

import { Seat, TicketDetails } from "./booking.state";

export const bookingActions = createActionGroup({
  source: "tickets",
  events: {
    add_seat: props<Seat>(),
    add_ticketDetails: props<TicketDetails>(),
  },
});
