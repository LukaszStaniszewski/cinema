import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Seat, Ticket, TicketDetails } from ".";

export const BookingActions = createActionGroup({
  source: "tickets",
  events: {
    "add ticket start": props<{ seat: Seat; id: string }>(),
    "add ticket success": props<Ticket>(),
    "remove ticket": props<{ id: string }>(),
    "update ticket": props<{ id: string; valueToUpdate: TicketDetails }>(),
    "reset state": emptyProps(),
    "update total price": props<{ total: number }>(),
  },
});
