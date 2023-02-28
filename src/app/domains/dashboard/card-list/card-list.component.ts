import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@domains/auth";
import { WatchListService } from "@domains/customer/watch-list/watch-list.service";

import { ShowingApiService } from "..";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private showingService: ShowingApiService,
    private watchListService: WatchListService,
    private authService: AuthService
  ) {}

  vm = this.showDefaultPage();
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params["day"]) return;
      const adjustedDate = params["day"].replaceAll("/", "-");
      this.vm = this.showingService.getShowings(adjustedDate);
    });

    if (this.authService.authState.authType === "customer") {
      this.watchListService.getFavoriteId();
    }
  }

  private showDefaultPage() {
    return this.showingService.getShowings("06-12-2022");
  }
}
