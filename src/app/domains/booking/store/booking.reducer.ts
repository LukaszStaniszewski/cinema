import { createReducer, on } from "@ngrx/store";

import { BookingActions } from "./booking.actions";
import { BookingState, initialBookingState } from "./booking.state";

export const bookingReducer = createReducer(
  initialBookingState,
  on(BookingActions.addTicketSuccess, (state, action): BookingState => {
    return {
      ...state,
      tickets: [...state.tickets, action],
    };
  }),
  on(BookingActions.removeTicket, (state, action): BookingState => {
    return {
      ...state,
      tickets: state.tickets.filter(ticket => ticket.id !== action.id),
    };
  }),
  on(BookingActions.updateTicket, (state, { id, valueToUpdate }) => {
    return {
      ...state,
      tickets: state.tickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, kind: valueToUpdate.kind, price: valueToUpdate.price }
          : ticket
      ),
    };
  }),
  on(BookingActions.updateTotalPrice, (state, action): BookingState => {
    return {
      ...state,
      totalPrice: action.total,
    };
  }),
  on(BookingActions.resetState, (): BookingState => {
    return {
      ...initialBookingState,
    };
  })
);
