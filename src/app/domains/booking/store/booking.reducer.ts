import { createReducer, on } from "@ngrx/store";

import { BookingActions } from "./booking.actions";
import { BookingState, initialBookingState } from "./booking.state";

export const bookingReducer = createReducer(
  initialBookingState,
  on(BookingActions.add_seat, (state, { seat }): BookingState => {
    return {
      ...state,
      seatBooked: { ...seat },
    };
  }),
  on(BookingActions.add_ticket, (state, action): BookingState => {
    return {
      ...state,
      tickets: [...state.tickets, action],
    };
  }),
  on(BookingActions.remove_ticket, (state, action): BookingState => {
    return {
      ...state,
      tickets: state.tickets.filter(ticket => ticket.id !== action.id),
    };
  })
);
