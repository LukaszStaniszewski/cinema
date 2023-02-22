import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MovieApiService } from "@core/movie/movie.api.service";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"],
})
export class AddMovieComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  actors = ["jeden", "dwa"];
  private builder = inject(NonNullableFormBuilder);
  private movieApiService = inject(MovieApiService);
  addMovieForm = this.createForm();

  createForm() {
    return this.builder.group({
      image: this.builder.control("", [Validators.required]),
      title: this.builder.control("", [Validators.required]),
      runTime: this.builder.control(0, [Validators.required]),
      premiere: this.builder.control(false, [Validators.requiredTrue]),
      actors: this.builder.control(null, [Validators.required]),
      genre: this.builder.control("", [Validators.required]),
      director: this.builder.control("", [Validators.required]),
      pg: this.builder.control("", [Validators.required]),
      description: this.builder.control("", [Validators.required]),
    });
  }

  get controls() {
    return this.addMovieForm.controls;
  }
  add(event: MatChipInputEvent) {
    const value = (event.value || "").trim();
    if (value) {
      this.actors.push(value);
    }
    event.chipInput.clear();
    // this.addMovieForm.controls.actors.setValue([]);
  }
  remove(actor: string) {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }
  submit() {
    this.addMovieForm.markAllAsTouched();
    if (this.addMovieForm.invalid) return;
    // this.movieApiService.addToDB(this.addMovieForm.getRawValue());
  }
}
