import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MovieApiService } from "@core/movie/movie.api.service";
import { formatDate } from "@shared/index";
import { CinemaRoomApiService, CinemaRoomName } from "@shared/services/cinema-room.api.service";

import { AddScreaningValidators, RepertuireApiService, RepertuireStore, Screening } from "..";

@Component({
  selector: "app-add-screening",
  templateUrl: "./add-screening.component.html",
  styleUrls: ["./add-screening.component.css"],
})
export class AddScreeningComponent {
  private builder = inject(NonNullableFormBuilder);
  private movieApiService = inject(MovieApiService);
  private cinemaRoomApiServie = inject(CinemaRoomApiService);
  private repertuireApiService = inject(RepertuireApiService);
  private repertuireStore = inject(RepertuireStore);

  addScreeningForm = this.createForm();
  startDate = new Date("12/5/2022");

  movies$ = this.movieApiService.getTitlesAndRunTime();
  takenTerms$ = this.repertuireStore.selectTakenTerms$;
  cinemaRooms$ = this.cinemaRoomApiServie.getNames();

  createForm() {
    return this.builder.group(
      {
        movie: this.builder.control<{ title: string; runTime: number }>(
          { title: "", runTime: NaN },
          {
            validators: [Validators.required],
          }
        ),
        date: this.builder.control<Date>(this.startDate, { validators: [Validators.required] }),
        hour: this.builder.control(0, { validators: [Validators.required] }),
        cinemaRoom: this.builder.control<CinemaRoomName>("room-a", { validators: [Validators.required] }),
      },
      {
        asyncValidators: [
          AddScreaningValidators.isGivenTermFree(this.repertuireApiService, this.repertuireStore),
        ],
      }
    );
  }

  get controls() {
    return this.addScreeningForm.controls;
  }

  filterOutPastDates = (date: Date | null): boolean => {
    const dayInCalendar = date?.valueOf() || this.startDate.valueOf();

    return dayInCalendar > this.startDate.valueOf();
  };

  submit() {
    this.addScreeningForm.markAllAsTouched();
    if (this.addScreeningForm.invalid) return;
    const { hour, date, movie, cinemaRoom } = this.addScreeningForm.getRawValue();
    const formatedDate = formatDate(date);
    const screening = {
      [cinemaRoom]: { hour: hour, movieTitle: movie.title },
      date: formatedDate,
    } as Screening;

    this.repertuireStore.add(screening);
    this.repertuireApiService.saveToDB({
      cinemaRoom,
      date: formatedDate,
      movieTitle: movie.title,
      runTime: movie.runTime,
      hour,
    });
  }
}
