export const API = {
  LOGIN: "/auth",
  LOGOUT: "/auth/logout",
  RESERVATIONS: "/reservations",
  CINEMAROOM: "/reservations/cinemaroom",
  MOVIES: "/movies",
  WANNA_SEE: "/movies/wanna-see",
  TICKET_INFO: "/tickets",
  SHOWINGS: "/showings",
  ORDERS: "/orders",
  ORDER_PAYED: "/orders/payed",
  ORDER_EMAIL: "/orders/email",
} as const;

export const SET_UP = {
  MAX_TICKETS_AMOUT_PER_USER: 10,
  TICKET_LIMIT: 10,
} as const;

export const MESSAGE = {
  WANNA_SEE_SUCCESS: "Film został dodany",
  WANNA_SEE_FAILURE: "Ten film juz został przez Ciebie wcześniej dodany",
  JWT_EXPIRED: "Twoja sesja wygasła, zaloguj się ponownie",
  TICKET_LIMIT: "Aby zakupić więcej biletów skontaktuj się z obsługą klienta",
  AUTHENTICATION_FAILED: "Zły email lub hasło",
  CINEMA_ROOM_NOT_FOUND:
    "Stało się coś nie oczekiwanego, powróc do wyboru repertuaru i spróbuj ponownie.",
  ORDER_RESIGN: "Mozesz wrócić do tego zamówienia poprzez koszyk i dokonczyć je w ciągu 15 minut",
} as const;
