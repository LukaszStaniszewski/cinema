export const API = {
  LOGIN: "/api/login",
  RESERVATIONS: "/api/reservations",
  SHOWINGS: "/api/showings",
  MOVIES: "/api/movies",
  CINEMAROOMS: "/api/cinemarooms",
  TICKET_INFO: "/api/ticketInfo",
  CURRENT_USER: "/api/users/current",
  WANNA_SEE_LIST: "/api/wanna-see/list",
  WANNA_SEE: "/api/wanna-see",
} as const;

export const SET_UP = {
  MAX_TICKETS_AMOUT_PER_USER: 10,
} as const;

export const MESSAGE = {
  WANNA_SEE_SUCCESS: "Film został dodany",
  WANNA_SEE_FAILURE: "Ten film juz został przez Ciebie wcześniej dodany",
  JWT_EXPIRED: "Twoja sesja wygasła, zaloguj się ponownie",
} as const;
