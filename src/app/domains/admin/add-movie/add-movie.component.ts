import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"],
})
export class AddMovieComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  actors = ["jeden", "dwa"];
  private builder = inject(NonNullableFormBuilder);

  addMovieForm = this.createForm();

  createForm() {
    return this.builder.group({
      imageLink: this.builder.control(""),
      movieTitle: this.builder.control(""),
      runTime: this.builder.control(""),
      pg: this.builder.control(""),
      actors: this.builder.control(""),
      genre: this.builder.control(""),
      director: this.builder.control(""),
      premiere: this.builder.control(""),
      description: this.builder.control(""),
    });
  }
  add(event: MatChipInputEvent) {
    const value = (event.value || "").trim();
    if (value) {
      this.actors.push(value);
    }
    event.chipInput.clear();
    this.addMovieForm.controls.actors.setValue("");
    console.log("actor add", event);
  }
  remove(actor: string) {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
    console.log("Actor", actor);
  }
}
