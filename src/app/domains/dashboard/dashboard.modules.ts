import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "src/app/app-routing.module";

import { CardComponent, CardListComponent, DatesComponent } from ".";

@NgModule({
  declarations: [CardComponent, DatesComponent, CardListComponent],
  exports: [CardListComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class DashboardModule {}
