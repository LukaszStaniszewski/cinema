import { createActionGroup, emptyProps, props } from "@ngrx/store";

import {
  Seat,
  Ticket,
  TicketDetails,
  TicketSortedByTypeValueToUpdate,
  TicketsSortedByType,
} from ".";

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

export const BookingTicketSortedActions = createActionGroup({
  source: "sorted",
  events: {
    "add initial values for ticket sorted by type": props<{ initial: TicketsSortedByType[] }>(),
    "add ticket sorted by type": props<{ payload: TicketsSortedByType }>(),
    "update tickets sorted by type start": props<{ payload: TicketSortedByTypeValueToUpdate }>(),
    "update tickets sorted by type success": props<{ payload: TicketsSortedByType[] }>(),
    "remove ticket sorted by type": props<{ payload: Omit<TicketsSortedByType, "amount"> }>(),
  },
});
