import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MovieApiService } from "@core/movie/movie.api.service";
import { CinemaRoomApiService } from "@shared/services/cinema-room.api.service";

@Component({
  selector: "app-add-showing",
  templateUrl: "./create-showing.component.html",
  styleUrls: ["./create-showing.component.css"],
})
export class CreateShowingComponent {
  private builder = inject(NonNullableFormBuilder);
  private movieApiService = inject(MovieApiService);
  private cinemaRoomApiServie = inject(CinemaRoomApiService);
  createShowingForm = this.createForm();

  movies$ = this.movieApiService.getTitles();
  cinemaRooms$ = this.cinemaRoomApiServie.getNames();

  createForm() {
    return this.builder.group({
      movie: this.builder.control("", { validators: [Validators.required] }),
      day: this.builder.control("", { validators: [Validators.required] }),
      hour: this.builder.control("", { validators: [Validators.required] }),
      cinemaRoom: this.builder.control("", { validators: [Validators.required] }),
    });
  }
  get controls() {
    return this.createShowingForm.controls;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  submit() {
    console.log();
  }

  selectedMovie($event: Event) {
    console.log();
  }
}
