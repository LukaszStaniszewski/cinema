import { createReducer, on } from "@ngrx/store";

import {
  // BookingState,
  BookingTicketActions,
  BookingTicketSortedActions,
  // initialBookingState,
} from ".";
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
  on(
    BookingTicketSortedActions.addInitialValuesForTicketSortedByType,
    (state, action): BookingState => {
      return {
        ...state,
        ticketsSortedByType: action.initial,
      };
    }
  ),
  on(BookingTicketSortedActions.addTicketSortedByType, (state, { payload }): BookingState => {
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
  on(
    BookingTicketSortedActions.updateTicketsSortedByTypeSuccess,
    (state, { payload }): BookingState => {
      return {
        ...state,
        ticketsSortedByType: [...payload],
      };
    }
  ),
  on(BookingTicketSortedActions.removeTicketSortedByType, (state, { payload }): BookingState => {
    return {
      ...state,
      ticketsSortedByType: state.ticketsSortedByType.map(ticket => {
        if (ticket.type === payload.type) {
          return {
            ...ticket,
            amount: Math.max(ticket.amount - 1, 0),
            price: Math.max(ticket.price - payload.price, 0),
          };
        }
        return ticket;
      }),
    };
  })
);
