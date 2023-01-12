import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MouseAnimationModule } from "src/app/shared/directives/mouseAnimation.directive";

import { CardComponent, CardListComponent, DatesComponent } from ".";

@NgModule({
  declarations: [CardComponent, DatesComponent, CardListComponent],
  exports: [CardListComponent],
  imports: [CommonModule, AppRoutingModule, MouseAnimationModule],
})
export class DashboardModule {}
