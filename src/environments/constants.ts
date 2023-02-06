export const API = {
  LOGIN: "/auth",
  RESERVATIONS: "/reservations",
  CINEMAROOMS: "/reservations/cinemaroom",
  MOVIES: "/movies",
  WANNA_SEE: "/movies/wanna-see",
  TICKET_INFO: "/tickets",
  SHOWINGS: "/showings",
  ORDER: "/",
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
    "Stało się coś nie oczekiwanego, powróc do wyboru repertuaru i spróbuj ponownie.",
} as const;
