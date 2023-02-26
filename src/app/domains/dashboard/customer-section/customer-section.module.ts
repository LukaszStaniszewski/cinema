import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CardCustomerSectionComponent, RatingComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: CardCustomerSectionComponent,
    outlet: "cardCustomerSection",
  },
];

@NgModule({
  declarations: [RatingComponent, CardCustomerSectionComponent],
  imports: [NgIf, NgFor, TitleCasePipe, AsyncPipe, RouterModule.forChild(routes)],
})
export default class CardCustomerSectionModule {}
