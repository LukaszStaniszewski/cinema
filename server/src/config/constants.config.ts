export const ErrorMessage = {
  NOT_AUTHENTICATED: "Invalid credentials",
  NOT_AUTHORIZED: "You are not authorized to make this action",
  JWT_EXPIRED: "jwt expired",
  WANNA_SEE_NOT_FOUND: "given user doesn't have any wanna see movies",
  SHOWINGS_NOT_FOUND: "No showings found for that day",
  MOVIE_NOT_ADDED: "Movie wasn't add to wanna see list",
  RESERVATION_NOT_FOUND: "Given reservation doesn't exist",
  CINEMA_ROOM_NOT_FOUND: "Given cinema room doesn't exist",
} as const;

export const SuccessMessage = {
  WANNA_SEE_DELETED: "Favorite move has been successfully deleted from the list",
  MOVIE_ADDED: "Movie has been added to user favorite list",
} as const;
