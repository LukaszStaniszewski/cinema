import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";

@Component({
  selector: "app-add-showing",
  templateUrl: "./create-showing.component.html",
  styleUrls: ["./create-showing.component.css"],
})
export class CreateShowingComponent {
  private builder = inject(NonNullableFormBuilder);

  addShowingForm = this.createForm();

  createForm() {
    return this.builder.group({
      movie: this.builder.group({
        imageLink: this.builder.control(""),
        movieTitle: this.builder.control(""),
        runTime: this.builder.control(""),
        description: this.builder.control(""),
        pg: this.builder.control(""),
        genre: this.builder.control(""),
      }),
      day: this.builder.control(""),
      hour: this.builder.control(""),
      cinemaRoom: this.builder.control(""),
    });
  }
}
