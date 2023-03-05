import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WatchListService } from "@domains/customer/watch-list/watch-list.service";

import { WannaSeeCardComponent } from "../card/wanna-see-card.component";

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

const routes: Routes = [
  {
    path: "",
    component: WannaSeeComponent,
    title: "Want to see page",
  },
];

@NgModule({
  declarations: [WannaSeeComponent, WannaSeeCardComponent],
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, RouterModule.forChild(routes)],
})
export default class WatchListModule {}
