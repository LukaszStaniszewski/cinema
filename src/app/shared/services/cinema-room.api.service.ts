import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of } from "rxjs";
import { API } from "src/environments/constants";

export type CinemaRoomName = "room-a" | "room-b" | "room-c";
@Injectable({
  providedIn: "root",
})
export class CinemaRoomApiService {
  private http = inject(HttpClient);

  getNames() {
    return this.http.get<string[]>(API.CINEMAROOM_NAMES).pipe(catchError(() => of([])));
  }
}
