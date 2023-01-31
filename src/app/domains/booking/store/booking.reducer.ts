import { createReducer, on } from "@ngrx/store";

import { bookingActions } from "./booking.actions";
import { BookingState, initialBookingState } from "./booking.state";

export const bookingReducer = createReducer(
  initialBookingState,
  on(bookingActions.add_seat, (state, action): BookingState => {
    return {
      ...state,
      seatBooked: { ...action },
    };
  }),
  on(bookingActions.add_ticket, (state, action): BookingState => {
    return {
      ...state,
      tickets: [...state.tickets, action],
    };
  })
);
