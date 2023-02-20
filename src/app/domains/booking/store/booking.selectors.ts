import { createFeatureSelector, createSelector } from "@ngrx/store";

import { BookingState } from "./booking.state";

export const selectBookingState = createFeatureSelector<BookingState>("booking");

export const selectTickets = createSelector(selectBookingState, state => state.tickets);

export const selectTicketsAtPosition = (index: number) =>
  createSelector(selectBookingState, state => state.tickets.at(index));

export const selectTotalPrice = createSelector(selectBookingState, state =>
  state.tickets.map(ticket => ticket.price).reduce((acc, current) => current + acc, 0)
);

export const selectTicketsWithTotalPrice = createSelector(
  selectTickets,
  selectTotalPrice,
  (tickets, totalPrice) => ({ tickets, totalPrice })
);

export const selectShowingPartial = createSelector(
  selectBookingState,
  state => state.showingPartial
);

export const selectTicketsWithShowingPartial = createSelector(
  selectShowingPartial,
  selectTickets,
  (showingPartial, tickets) => ({ showingPartial, tickets })
);

export const selectTicketsWithShowingPartialAndUrl = createSelector(
  selectBookingState,
  ({ showingPartial, tickets, url }) => ({ showingPartial, tickets, url })
);

export const selectTicketsWithTotalPriceAndShowingPartial = createSelector(
  selectTicketsWithTotalPrice,
  selectShowingPartial,
  (ticketsWithTotalPrice, showingPartial) => ({ ...ticketsWithTotalPrice, showingPartial })
);
