import { ShowingPartial } from "@domains/dashboard";
import { Maybe } from "@shared/utility-types";

import { AppState } from "../reservation/reservation.module";

export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type TicketDetails = {
  type: TicketTypes;
  price: number;
};

export type TicketTypes = "normalny" | "ulgowy" | "family" | "voucher";

export type Ticket = {
  id: string;
  seat: Seat;
  type: TicketTypes;
  price: number;
};

export type TicketsSortedByType = {
  amount: number;
  type: string;
  price: number;
};

export type TicketSortedByTypeValueToUpdate = {
  type: string;
  price: number;
  currentType: string;
};

export type BookingState = {
  tickets: Ticket[];
  totalPrice: number;
  showingPartial: Maybe<ShowingPartial>;
  reservationId: string;
  url: string;
};

export const bookingFeatureKey = "booking" as const;

type BookingPick = Required<Pick<AppState, "booking">>;

export type AppStateWithBookingState = AppState & BookingPick;

export const initialBookingState: BookingState = {
  tickets: [],
  totalPrice: 0,
  showingPartial: null,
  url: "",
  reservationId: "",
};
