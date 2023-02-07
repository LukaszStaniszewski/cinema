import { createReducer, on } from "@ngrx/store";

import { BookingActions } from "./booking.actions";
import { BookingState, initialBookingState } from "./booking.state";

export const bookingReducer = createReducer(
  initialBookingState,
  on(BookingActions.addTicketSuccess, (state, action): BookingState => {
    return {
      ...state,
      tickets: [...state.tickets, action.payload],
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
          ? { ...ticket, type: valueToUpdate.type, price: valueToUpdate.price }
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
  }),
  on(BookingActions.addInitialValuesForTicketSortedByType, (state, action): BookingState => {
    return {
      ...state,
      ticketsSortedByType: action.initial,
    };
  }),
  on(BookingActions.addTicketSortedByType, (state, { payload }): BookingState => {
    return {
      ...state,
      ticketsSortedByType: state.ticketsSortedByType.map(stat => {
        if (stat.type === payload.type) {
          return { ...stat, amount: stat.amount + 1, price: stat.price + payload.price };
        }
        return stat;
      }),
    };
  }),
  on(BookingActions.updateTicketsSortedByTypeSuccess, (state, { payload }): BookingState => {
    return {
      ...state,
      ticketsSortedByType: [...payload],
    };
  })
);
