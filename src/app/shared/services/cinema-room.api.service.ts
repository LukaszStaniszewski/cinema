import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, of } from "rxjs";
import { API, MESSAGE } from "src/environments/constants";

@Injectable({
  providedIn: "root",
})
export class CinemaRoomApiService {
  private http = inject(HttpClient);

  getNames() {
    return this.http.get<string[]>(API.CINEMAROOM_NAMES).pipe(catchError(() => of([])));
  }
}
