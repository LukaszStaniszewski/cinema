import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { MouseAnimationDirective } from "@shared/directives/mouseAnimation.directive";
import { ToastComponent } from "@shared/ui/toast/toast.component";
import { AppRoutingModule } from "src/app/app-routing.module";

import { CardComponent, CardListComponent, DatesComponent } from ".";

@NgModule({
  declarations: [CardComponent, DatesComponent, CardListComponent],
  exports: [CardListComponent],
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    AsyncPipe,
    AppRoutingModule,
    MouseAnimationDirective,
    ToastComponent,
  ],
})
export class DashboardModule {}
