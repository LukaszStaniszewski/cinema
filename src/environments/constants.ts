export const API = {
  LOGIN: "/auth",
  RESERVATIONS: "/reservations",
  CINEMAROOMS: "/reservations/cinemaroom",
  MOVIES: "/movies",
  WANNA_SEE: "/movies/wanna-see",
  TICKET_INFO: "/tickets",
  SHOWINGS: "/showings",
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
} as const;
