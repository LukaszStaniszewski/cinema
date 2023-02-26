import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "@environments/constants";
import { BehaviorSubject, catchError, of } from "rxjs";
type ShowRepertuireVM = {
  [key: string]: [{ hour: number; movieTitle: string }];
};
@Injectable({
  providedIn: "root",
})
export class RepertuireApiService {
  takenTerms$$ = new BehaviorSubject<string>("");
  constructor(private http: HttpClient) {}

  get takenTerms$() {
    return this.takenTerms$$.asObservable();
  }

  getByDay(day: string) {
    return this.http.get<ShowRepertuireVM>(`${API.REPERTUIRE}/${day}`);
  }

  getDaysThatHaveAddedRepertuire() {
    return this.http.get<string[]>(`${API.DAYS_WITH_SET_REPERTUIRE}`).pipe(catchError(() => of([])));
  }
  checkTermAvailability(date: string, roomName: string) {
    return this.http.get<string[] | null>(
      `${API.CHECK_REPERTUIRE_AVAILABILITY}?day=${"06-12-2022"}&cinemaRoom=${roomName}`
    );
  }

  setTakenTerms(terms: string[]) {
    this.takenTerms$$.next(terms.toString());
  }
}
