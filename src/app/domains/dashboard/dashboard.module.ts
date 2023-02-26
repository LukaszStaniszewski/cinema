import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanMatchCustomerSection } from "@core/index";
import { MouseAnimationDirective } from "@shared/directives/mouseAnimation.directive";
import { ToastComponent } from "@shared/ui/toast/toast.component";

import { CardComponent, CardListComponent, DatesComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: CardListComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./customer-section/customer-section.module"),
        // outlet: "cardAuthUser",
        // canMatch: [CanMatchCustomerSection],
      },
    ],
  },
];

@NgModule({
  declarations: [CardComponent, DatesComponent, CardListComponent],
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    AsyncPipe,
    MouseAnimationDirective,
    ToastComponent,
    RouterModule.forChild(routes),
  ],
})
export default class DashboardModule {}
