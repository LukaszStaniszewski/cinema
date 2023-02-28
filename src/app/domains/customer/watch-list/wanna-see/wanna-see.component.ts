import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { WatchListService } from "@domains/customer/watch-list/watch-list.service";

@Component({
  selector: "app-wanna-see",
  templateUrl: "./wanna-see.component.html",
  styleUrls: ["./wanna-see.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WannaSeeComponent {
  private watchListService = inject(WatchListService);
  vm$ = this.watchListService.getFavorites();

  protected removeFromWannaSee(moveId: string) {
    this.watchListService.delete(moveId);
  }
}
