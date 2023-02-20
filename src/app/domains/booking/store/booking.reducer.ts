import { createReducer, on } from "@ngrx/store";

import { BookingApiAtions, BookingTicketActions } from ".";
import { BookingState, initialBookingState } from "./booking.state";

export const bookingReducer = createReducer(
  initialBookingState,
  on(BookingTicketActions.addTicketSuccess, (state, action): BookingState => {
    return {
      ...state,
      tickets: [...state.tickets, action.payload],
    };
  }),
  on(BookingTicketActions.removeTicket, (state, action): BookingState => {
    return {
      ...state,
      tickets: state.tickets.filter(ticket => ticket.id !== action.id),
    };
  }),
  on(BookingTicketActions.updateTicket, (state, { id, valueToUpdate }) => {
    return {
      ...state,
      tickets: state.tickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, type: valueToUpdate.type, price: valueToUpdate.price }
          : ticket
      ),
    };
  }),
  on(BookingTicketActions.updateTotalPrice, (state, action): BookingState => {
    return {
      ...state,
      totalPrice: action.total,
    };
  }),
  on(BookingTicketActions.resetState, (): BookingState => {
    return {
      ...initialBookingState,
    };
  }),
  on(BookingApiAtions.getTicketsSuccess, (state, action): BookingState => {
    return {
      ...state,
      tickets: action.payload,
    };
  }),
  on(BookingApiAtions.getShowingPartialSuccess, (state, action): BookingState => {
    return {
      ...state,
      showing: action.payload,
    };
  })
);
