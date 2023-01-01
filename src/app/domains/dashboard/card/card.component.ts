import { Component, Input } from "@angular/core";

import type { Showing } from "../services/showing-state.service";

@Component({
  selector: "app-card[showing]",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  isLoading = false;
  @Input() showing!: Showing;

  get movie() {
    return this.showing.movie;
  }
  get hours() {
    return this.showing.available;
  }
}
