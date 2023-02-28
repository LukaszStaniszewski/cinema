import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { of } from "rxjs";

import { CardCustomerSectionComponent } from "../customer-section";
import type { Showing } from "../shared/showing-api.service";

@Component({
  selector: "app-card[showing]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  isLoading = false;
  @ViewChild("addToWannaSee", { static: true })
  buttonElement!: ElementRef<HTMLButtonElement>;
  @Input() showing!: Showing;

  get movie() {
    return this.showing.movie;
  }
  get hours() {
    return this.showing.available;
  }

  onActivate(component: CardCustomerSectionComponent) {
    component.movieId = this.showing.movie.id;
    const userRate = this.showing.movie.userRate;
    if (userRate) {
      console.log("on Activate rating", userRate);
      // component.rate = of(Number(userRate));
      component.rate = Number(userRate);
    }
  }
}
