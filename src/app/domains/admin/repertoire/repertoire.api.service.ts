import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "@environments/constants";
type ShowRepertuireVM = {
  [key: string]: [{ hour: number; movieTitle: string }];
};
@Injectable({
  providedIn: "root",
})
export class RepertuireApiService {
  constructor(private http: HttpClient) {}

  getByDay(day: string) {
    return this.http.get<ShowRepertuireVM>(`${API.REPERTUIRE}/${day}`);
  }

  getDays() {
    return this.http.get<string[]>(``);
  }
}
