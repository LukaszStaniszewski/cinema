import { Action, createActionGroup, props } from "@ngrx/store";

import { Seat, SeatBooked, Ticket, TicketDetails } from "./booking.state";

export const BookingActions = createActionGroup({
  source: "tickets",
  events: {
    "add ticket start": props<{ seat: Seat; id: string }>(),
    "add ticket success": props<Ticket>(),
    "remove ticket": props<{ id: string }>(),
    "update ticket": props<{ id: string; valueToUpdate: TicketDetails }>(),
  },
});
