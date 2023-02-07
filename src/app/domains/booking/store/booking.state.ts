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
  ticketsSortedByType: TicketsSortedByType[];
  totalPrice: number;
  showingId: string;
};

export const bookingFeatureKey = "booking" as const;

type BookingPick = Required<Pick<AppState, "booking">>;

export type AppStateWithBookingState = AppState & BookingPick;

export const initialBookingState: BookingState = {
  tickets: [],
  ticketsSortedByType: [],
  totalPrice: 0,
  showingId: "",
};
