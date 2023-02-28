import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "@environments/constants";
import { CinemaRoomName } from "@shared/services/cinema-room.api.service";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { catchError, of } from "rxjs";

export type ShowRepertuire = {
  [key in CinemaRoomName]: { hour: number; movieTitle: string }[];
};
type Screening = {
  hour: number;
  movieTitle: string;
  date: string;
  cinemaRoom: string;
  runTime: number;
};
@Injectable({
  providedIn: "root",
})
export class RepertuireApiService {
  private http = inject(HttpClient);
  private toast = inject(ToastStateService);

  getByDay(day: string) {
    const adjustedDate = day.replaceAll("/", "-");
    return this.http.get<ShowRepertuire>(`${API.REPERTUIRE}/${adjustedDate}`);
  }

  getDaysThatHaveAddedRepertuire() {
    return this.http.get<string[]>(`${API.DAYS_WITH_SET_REPERTUIRE}`).pipe(catchError(() => of([])));
  }
  checkTermAvailability(date: string, roomName: string) {
    return this.http.get<string[] | null>(
      `${API.CHECK_REPERTUIRE_AVAILABILITY}?day=${"06-12-2022"}&cinemaRoom=${roomName}`
    );
  }

  saveToDB(screening: Screening) {
    this.http.post(API.REPERTUIRE, screening).subscribe({
      next: () => this.toast.activateToast({ message: "Seans został pomyślnie dodany", status: "info" }),
      error: () => this.toast.activateToast({ message: "Seans nie został dodany", status: "error" }),
    });
  }
}
