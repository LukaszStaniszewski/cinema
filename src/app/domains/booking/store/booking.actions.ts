import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Seat, Ticket, TicketDetails } from ".";

export const BookingTicketActions = createActionGroup({
  source: "tickets",
  events: {
    "add ticket start": props<{ seat: Seat; id: string }>(),
    "add ticket success": props<{ payload: Ticket }>(),
    "remove ticket": props<{ id: string }>(),
    "remove ticket success": props<{ id: string }>(),
    "update ticket": props<{ id: string; valueToUpdate: TicketDetails }>(),
    "reset state": emptyProps(),
    "update total price": props<{ total: number }>(),
  },
});

export const BookingApiAtions = createActionGroup({
  source: "tickets",
  events: {
    "get tickets start": emptyProps(),
    "get tickets success": props<{ payload: Ticket[] }>(),
    "get tickets failure": props<{ payload: string }>(),
  },
});
