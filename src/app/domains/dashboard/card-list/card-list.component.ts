import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ShowingStateService } from "..";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  // state$ = this.showings.showings$.pipe(take(1))
  constructor(private route: ActivatedRoute, private showings: ShowingStateService) {}
  get state$() {
    return this.showings.showings$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params["day"]) {
        return this.showDefaultPage();
      }
      const adjustedDate = params["day"].replaceAll("/", "-");

      this.showings.getShowings(adjustedDate);
    });
  }

  private showDefaultPage() {
    this.showings.getShowings("06-12-2022");
  }
}
