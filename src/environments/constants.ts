export const API = {
  LOGIN: "/auth",
  RESERVATIONS: "/reservations",
  SHOWINGS: "/showings",
  MOVIES: "/movies",
  WANNA_SEE: "/movies/wanna-see",
  CINEMAROOMS: "/cinemarooms",
  TICKET_INFO: "/ticketInfo",
  // CURRENT_USER: "/api/users/current", // powinno byc pod /api/login bo to get, login pierwszy to post
} as const;

export const SET_UP = {
  MAX_TICKETS_AMOUT_PER_USER: 10,
} as const;

export const MESSAGE = {
  WANNA_SEE_SUCCESS: "Film został dodany",
  WANNA_SEE_FAILURE: "Ten film juz został przez Ciebie wcześniej dodany",
  JWT_EXPIRED: "Twoja sesja wygasła, zaloguj się ponownie",
} as const;
