import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MovieApiService } from "@core/movie/movie.api.service";
import { CinemaRoomApiService } from "@shared/services/cinema-room.api.service";

import { RepertuireApiService } from "../repertoire.api.service";
import { AddScreaningValidators } from "./add-screening.validators";

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
  createShowingForm = this.createForm();

  movies$ = this.movieApiService.getTitlesAndRunTime();
  takenTerms$ = this.repertuireApiService.takenTerms$;
  cinemaRooms$ = this.cinemaRoomApiServie.getNames();

  createForm() {
    return this.builder.group(
      {
        movie: this.builder.control("", { validators: [Validators.required] }),
        day: this.builder.control("", { validators: [Validators.required] }),
        hour: this.builder.control("", { validators: [Validators.required] }),
        cinemaRoom: this.builder.control("", { validators: [Validators.required] }),
      },
      { asyncValidators: [AddScreaningValidators.isGivenTermFree(this.repertuireApiService)] }
    );
  }

  constructor() {
    this.createShowingForm.valueChanges.subscribe(console.log);
    const today = new Date();
    console.log(today.toLocaleDateString());
  }
  get controls() {
    return this.createShowingForm.controls;
  }

  filterOutPastDates = (date: Date | null): boolean => {
    const now = Date.now();
    const dayInCalendar = date?.valueOf() || now;

    return dayInCalendar > now;
  };

  submit() {
    console.log();
  }
}
