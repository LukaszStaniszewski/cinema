import { createFeatureSelector, createSelector } from "@ngrx/store";

import { BookingState } from "./booking.state";

const selectBookingState = createFeatureSelector<BookingState>("booking");

export const selectTickets = createSelector(selectBookingState, state => state.tickets);
