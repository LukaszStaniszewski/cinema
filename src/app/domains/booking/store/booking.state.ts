import { Maybe } from "@shared/utility-types";

import { AppState } from "../booking.module";

export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};
export type SeatBooked = {
  id: string;
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type TicketDetails = {
  category: TicketTypes;
  price: number;
};
export type TicketTypes = "normalny" | "concessionary" | "family" | "voucher";

export type Ticket = {
  seat: SeatBooked;
  type: TicketTypes;
  price: number;
};

type TicketState = {
  ticketsTech: TicketDetails[];
  tickets: Ticket[];
  showingId: string | null;
  totalPrice: number;
};

export type BookingState = {
  tickets: Ticket[];
  seatsBooked: Seat[];
};

export const bookingFeatureKey = "booking" as const;

export const initialBookingState: BookingState = {
  seatsBooked: [],
  tickets: [],
};

type BookingPick = Required<Pick<AppState, "booking">>;

export type AppStateWithBookingState = AppState & BookingPick;
