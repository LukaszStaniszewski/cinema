import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "../booking.module";
import { BookingState } from "./booking.state";

// const selectBookingState = (state: AppState) => state.booking;

const selectBookingState = createFeatureSelector<BookingState>("booking");

export const selectBookedSeats = createSelector(
  selectBookingState,
  state => state.seatsBooked
);

export const selectExactBookedSeat = (index: number) =>
  createSelector(selectBookingState, state => state.seatsBooked.at(index));
// bookedSeats  = this.store.select(selectBookedSeats)
