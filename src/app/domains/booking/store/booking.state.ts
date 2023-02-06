import { AppState } from "../reservation/reservation.module";

export type Seat = {
  position: { column: string; row: string };
  reservation: boolean;
  taken: boolean;
  status: "standard" | "vip";
};

export type TicketDetails = {
  kind: TicketTypes;
  price: number;
};

export type TicketTypes = "normalny" | "ulgowy" | "family" | "voucher";

export type Ticket = {
  id: string;
  seat: Seat;
  kind: TicketTypes;
  price: number;
};

export type TicketsSortedByType = {
  amount: number;
  kind: string;
  total: number;
};

export type BookingState = {
  tickets: Ticket[];
  // orderStats ?
  ticketStats: TicketsSortedByType[];
  totalPrice: number;
  showingId: string;
};

export const bookingFeatureKey = "booking" as const;

type BookingPick = Required<Pick<AppState, "booking">>;

export type AppStateWithBookingState = AppState & BookingPick;

export const initialBookingState: BookingState = {
  tickets: [],
  ticketStats: [],
  totalPrice: 0,
  showingId: "",
};
